import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(protected configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const { refreshToken } = request.cookies;
          if (!refreshToken) {
            throw new UnauthorizedException();
          }
          return refreshToken;
        },
      ]),
      secretOrKey: configService.get('SECRET_KEY'),
      passReqToCallback: true,
      ignoreExpiration: false,
    });
  }

  validate(req: Request, payload: any) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token malformed');
    }
    return { ...payload, refreshToken };
  }
}
