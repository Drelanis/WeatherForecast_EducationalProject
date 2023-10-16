import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request, Response, NextFunction } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AuthMiddleware
  extends PassportStrategy(Strategy, 'jwt')
  implements NestMiddleware
{
  constructor(protected configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const accessToken = request?.cookies['accessToken'];
          if (!accessToken) {
            return null;
          }
          return accessToken;
        },
      ]),
      passReqToCallback: true,
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET_KEY'),
    });
  }

  validate(req: Request, payload: any) {
    const { accessToken } = req.cookies;
    return { ...payload, accessToken };
  }

  use(req: Request, res: Response, next: NextFunction) {
    if (req.body.query.includes('login' || 'registration' || 'refreshTokens')) {
      return next();
    }
    const accessToken = req?.cookies['accessToken'];
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    next();
  }
}
