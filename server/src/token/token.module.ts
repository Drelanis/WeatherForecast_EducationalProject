import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtOptions } from '@auth/config/jwt-module-options.config';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [TokenService],
  imports: [JwtModule.register(jwtOptions), PassportModule],
})
export class TokenModule {}
