import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@users/users.module';
import { PassportModule } from '@nestjs/passport';
import { options } from './config/jwt-module-options.config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, JwtModule.register(options), PassportModule],
})
export class AuthModule {}
