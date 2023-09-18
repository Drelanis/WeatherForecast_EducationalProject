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
import { LoginUserDto } from './dto/login-user.dto';
import { TokenService } from 'src/token/token.service';
import { ITokens } from '../token/interfaces/token.interface';

const REFRESH_TOKEN = 'refreshtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  async login(userDto: LoginUserDto, response: Response, userAgent: string) {
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

  async registration(userDto: CreateUserDto) {
    try {
      const hashPassword = await bcrypt.hash(userDto.password, 5);
      const user = await this.userService.create({
        ...userDto,
        password: hashPassword,
        passwordRepeat: hashPassword,
      });
      return user;
    } catch (error) {
      throw new BadRequestException('Registration Error');
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

  private async validateUser(data: LoginUserDto) {
    try {
      const user = await this.userService.findOne(data.email);
      await bcrypt.compare(data.password, user.password);
      return user;
    } catch (error) {
      throw new BadRequestException('Uncorrect email or password');
    }
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
