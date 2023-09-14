import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { add } from 'date-fns';
import { v4 } from 'uuid';
import { Token } from '@prisma/client';
import { UsersService } from '@users/users.service';
import { ITokens } from './interfaces/token.interface';
import { IUser } from '@users/interfaces/user.interface';

const REFRESH_TOKEN = 'refreshtoken';

@Injectable()
export class TokenService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  setRefreshTokenToCookies(tokens: ITokens, response: Response) {
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

  async generateTokens(user: IUser, userAgent: string): Promise<ITokens> {
    const accessToken = await this.getAccessToken(user);
    const refreshToken = await this.getRefreshToken(user.id, userAgent);
    return { accessToken, refreshToken };
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

  async refreshTokens(
    refreshToken: string,
    userAgent: string,
  ): Promise<ITokens> {
    const token = await this.prisma.token.delete({
      where: { token: refreshToken },
    });
    if (!token || new Date(token.exp) < new Date()) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findOne(token.userId);
    const tokens = this.generateTokens(user, userAgent);
    return tokens;
  }
}
