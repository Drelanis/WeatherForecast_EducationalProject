import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { add } from 'date-fns';
import { ITokens } from '@auth/interfaces/token.interface';
import { Token } from '@auth/models/token.model';
import { User } from '@users/models/user.model';
import { UsersService } from '@users/users.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
  ) {}

  async deleteRefreshToken(refreshToken: string): Promise<Token> {
    try {
      const token = await this.prisma.token.findFirst({
        where: { token: refreshToken },
      });
      const deletedToken = await this.prisma.token.delete({
        where: { id: token.id },
      });
      return deletedToken;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async generateTokens(user: User, userAgent: string): Promise<ITokens> {
    const accessToken = await this.getAccessToken(user);
    const refreshToken = await this.getRefreshToken(user.id, userAgent);
    return { accessToken, refreshToken };
  }

  async getAccessToken(user: User): Promise<string> {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      cities: user.cities,
    };
    const accessToken = this.jwtService.sign(payload);
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
        token: this.jwtService.sign({ userId, userAgent: agent }),
        exp: add(new Date(), { days: 1 }),
      },
      create: {
        token: this.jwtService.sign({ userId, userAgent: agent }),
        exp: add(new Date(), { days: 1 }),
        userId,
        userAgent: agent,
      },
    });
  }

  async refreshTokens(
    refreshToken: string,
    agent: string,
  ): Promise<{
    userId: string;
    tokens: ITokens;
  }> {
    const token = await this.deleteRefreshToken(refreshToken);
    if (!token || new Date(token.exp) < new Date()) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findOne(token.userId);
    const tokens = await this.generateTokens(user, agent);
    return { userId: token.userId, tokens };
  }
}
