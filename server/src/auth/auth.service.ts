import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UsersService } from '@users/users.service';
import { TokenService } from '@auth/token.service';
import { ITokens } from './interfaces/token.interface';
import { LoginUserInput } from './dto/user-login.input';
import { UserResgistrationInput } from './dto/user-registration.input';
import { add } from 'date-fns';

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
      this.setTokensToCookies(tokens, response);
      return { userId: user.id, ...tokens };
    } catch (error) {
      throw new BadRequestException(error.message, 'Authorization error');
    }
  }

  async refreshTokens(refreshToken: string, agent: string, response: Response) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const tokens = await this.tokenService.refreshTokens(refreshToken, agent);
    this.setTokensToCookies(tokens, response);
    return tokens;
  }

  async registration(userRegInput: UserResgistrationInput) {
    try {
      const hashPassword = await bcrypt.hash(userRegInput.password, 5);
      await this.isEmailUnique(userRegInput);
      await this.userService.create({
        ...userRegInput,
        password: hashPassword,
        passwordRepeat: hashPassword,
      });
      return true;
    } catch (error) {
      throw new BadRequestException('Registration Error', error.message);
    }
  }

  async logout(token: string, response: Response) {
    try {
      if (!token) {
        throw new InternalServerErrorException('Refreshtoken not found');
      }
      await this.tokenService.deleteRefreshToken(token);
      this.deleteTokensFromCookies(response);
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Logout error', error.message);
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

  private setTokensToCookies(tokens: ITokens, response: Response) {
    if (!tokens) {
      throw new UnauthorizedException();
    }
    this.setAccessTokenToCookies(tokens, response);
    this.setRefreshTokenToCookies(tokens, response);
  }

  private deleteTokensFromCookies(response: Response) {
    if (!response) {
      throw new UnauthorizedException();
    }
    this.deleteAccessTokenFromCookies(response);
    this.deleteRefreshTokenFromCookies(response);
  }

  private setRefreshTokenToCookies = (tokens: ITokens, response: Response) => {
    response.cookie(
      this.configService.get('REFRESH_TOKEN'),
      tokens.refreshToken.token,
      {
        httpOnly: true,
        sameSite: 'lax',
        expires: new Date(tokens.refreshToken.exp),
        secure:
          this.configService.get('NODE_ENV', 'development') === 'production',
        path: '/',
      },
    );
  };

  private setAccessTokenToCookies = (tokens: ITokens, response: Response) => {
    response.cookie(
      this.configService.get('ACCESS_TOKEN'),
      tokens.accessToken,
      {
        httpOnly: true,
        sameSite: 'lax',
        expires: add(new Date(), { minutes: 5 }),
        secure:
          this.configService.get('NODE_ENV', 'development') === 'production',
        path: '/',
      },
    );
  };

  private deleteAccessTokenFromCookies = (response: Response) => {
    response.cookie(this.configService.get('ACCESS_TOKEN'), '', {
      httpOnly: true,
      secure: true,
      expires: new Date(),
    });
  };

  private deleteRefreshTokenFromCookies = (response: Response) => {
    response.cookie(this.configService.get('REFRESH_TOKEN'), '', {
      httpOnly: true,
      secure: true,
      expires: new Date(),
    });
  };
}
