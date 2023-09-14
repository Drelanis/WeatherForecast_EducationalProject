import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { IUser } from '@users/interfaces/user.interface';
import { UsersService } from '@users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from '@prisma/prisma.service';
import { v4 } from 'uuid';
import { add } from 'date-fns';
import { Token } from '@prisma/client';
import { IToken } from './interfaces/token.interface';
import { ConfigService } from '@nestjs/config';

const REFRESH_TOKEN = 'refreshtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  async login(userDto: LoginUserDto, response: Response, userAgent: string) {
    try {
      const user = await this.validateUser(userDto);
      const accessToken = await this.getAccessToken(user);
      const refreshToken = await this.getRefreshToken(user.id, userAgent);
      const tokens = { accessToken, refreshToken };
      this.setRefreshTokenToCookies(tokens, response);
      return response.status(HttpStatus.CREATED).json({ accessToken });
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

  private async getAccessToken(user: IUser): Promise<string> {
    const payload = {
      id: user.id,
      email: user.email,
      cities: user.cities,
    };
    const accessToken = `Bearer ${this.jwtService.sign(payload)}`;
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    return accessToken;
  }

  private async getRefreshToken(userId: string, agent: string): Promise<Token> {
    const token = await this.prisma.token.findFirst({
      where: {
        userId,
        userAgent: agent,
      },
    });
    const tokenValue = token?.token ?? null;
    return this.prisma.token.upsert({
      where: { token: tokenValue || '' },
      update: {
        token: v4(),
        exp: add(new Date(), { months: 1 }),
      },
      create: {
        token: v4(),
        exp: add(new Date(), { months: 1 }),
        userId,
        userAgent: agent,
      },
    });
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

  setRefreshTokenToCookies(tokens: IToken, response: Response) {
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

  async refreshTokens(
    refreshToken: string,
    userAgent: string,
  ): Promise<IToken> {
    const token = await this.prisma.token.delete({
      where: { token: refreshToken },
    });
    if (!token || new Date(token.exp) < new Date()) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findOne(token.userId);
    const accessToken = await this.getAccessToken(user);
    const newRefreshToken = await this.getRefreshToken(user.id, userAgent);
    return { accessToken, refreshToken: newRefreshToken };
  }
}
