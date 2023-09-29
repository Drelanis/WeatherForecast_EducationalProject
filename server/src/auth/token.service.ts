import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { add } from 'date-fns';
import { v4 } from 'uuid';
import { ITokens } from '@auth/interfaces/token.interface';
import { Token } from '@auth/models/token.model';
import { User } from '@users/models/user.model';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async deleteRefreshToken(refreshToken: string): Promise<Token> {
    const token = await this.prisma.token.findFirst({
      where: { token: refreshToken },
    });
    const deletedToken = await this.prisma.token.delete({
      where: { id: token.id },
    });
    return deletedToken;
  }

  async generateTokens(user: User, userAgent: string): Promise<ITokens> {
    const accessToken = await this.getAccessToken(user);
    const refreshToken = await this.getRefreshToken(user.id, userAgent);
    return { accessToken, refreshToken };
  }

  private async getAccessToken(user: User): Promise<string> {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
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
    const tokeId = token?.id ?? '';
    return this.prisma.token.upsert({
      where: { id: tokeId },
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
