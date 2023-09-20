import { IJwtPayload } from '@auth/interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IUser } from '@users/interfaces/user.interface';
import { UsersService } from '@users/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: IJwtPayload) {
    const user: IUser = await this.userService.findOne(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
