import {
  BadRequestException,
  ConflictException,
  Injectable,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UsersService } from '@users/users.service';
import { TokenService } from 'src/token/token.service';
import { ITokens } from '../token/interfaces/token.interface';
import { LoginUserInput } from './dto/user-login.input';
import { UserResgistrationInput } from './dto/user-registration.input';

const REFRESH_TOKEN = 'refreshtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  async login(userDto: LoginUserInput, response: Response, userAgent: string) {
    try {
      const user = await this.validateUser(userDto);
      const tokens = await this.tokenService.generateTokens(user, userAgent);
      this.setRefreshTokenToCookies(tokens, response);
      return response
        .status(HttpStatus.CREATED)
        .json({ accessToken: tokens.accessToken });
    } catch (error) {
      throw new ConflictException('Authorization error', error.message);
    }
  }

  async registration(userRegInput: UserResgistrationInput) {
    try {
      const hashPassword = await bcrypt.hash(userRegInput.password, 5);
      await this.isEmailUnique(userRegInput);
      const user = await this.userService.create({
        ...userRegInput,
        password: hashPassword,
        passwordRepeat: hashPassword,
      });
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async logout(token: string, response: Response) {
    try {
      this.tokenService.deleteRefreshToken(token);
      return response.cookie(REFRESH_TOKEN, '', {
        httpOnly: true,
        secure: true,
        expires: new Date(),
      });
    } catch (error) {
      throw new ConflictException('Logout error', error.message);
    }
  }

  private async isEmailUnique(userDto: CreateUserDto) {
    const user = await this.userService.findOne(userDto.email);
    if (user) {
      throw new BadRequestException('A user with this email already exists');
    }
  }

  private async validateUser(data: LoginUserInput) {
    const user = await this.userService.findOne(data.email);
    const passwordCompare = await bcrypt.compare(data.password, user.password);
    if (!passwordCompare) {
      throw new BadRequestException('Uncorrect email or password');
    }
    return user;
  }

  private setRefreshTokenToCookies(tokens: ITokens, response: Response) {
    if (!tokens) {
      throw new UnauthorizedException();
    }
    response.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(tokens.refreshToken.exp),
      secure:
        this.configService.get('NODE_ENV', 'development') === 'production',
      path: '/',
    });
    return response
      .status(HttpStatus.CREATED)
      .json({ accesToken: tokens.accessToken });
  }
}
