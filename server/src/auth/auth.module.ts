import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '@users/users.module';
import { jwtOptions } from './config/jwt-module-options.config';
import { STRATEGIES } from './strategies';
import { TokenService } from '@auth/token.service';
import { AuthResolver } from './auth.resolver';

@Module({
  providers: [
    AuthService,
    TokenService,
    ConfigService,
    AuthResolver,
    ...STRATEGIES,
  ],
  imports: [UsersModule, JwtModule.register(jwtOptions), PassportModule],
})
export class AuthModule {}
