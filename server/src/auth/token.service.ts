import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { add } from 'date-fns';
import { v4 } from 'uuid';
import { Token, User } from '@prisma/client';
import { ITokens } from './interfaces/token.interface';
import { IUser } from '@users/interfaces/user.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async deleteRefreshToken(token: string) {
    const deletedToken = this.prisma.token.delete({ where: { token } });
    return deletedToken;
  }

  async generateTokens(user: User, userAgent: string): Promise<ITokens> {
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
}
