import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@users/users.module';
import { PassportModule } from '@nestjs/passport';
import { jwtOptions } from './config/jwt-module-options.config';
import { ConfigService } from '@nestjs/config';
import { STRATEGIES } from './strategies';
import { TokenService } from './token.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenService, ConfigService, ...STRATEGIES],
  imports: [UsersModule, JwtModule.register(jwtOptions), PassportModule],
})
export class AuthModule {}
