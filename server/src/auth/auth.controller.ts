import {
  Controller,
  Post,
  Body,
  UsePipes,
  Get,
  Res,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UniqueEmailPipe } from '@users/pipes/unique-email.pipe';
import { UserDtoPipe } from '@users/pipes/user-dto.pipe';
import { LoginUserDto } from './dto/login-user.dto';
import { Cookie } from '@common/decarators/get-cookies.decarator';
import { UserAgent } from '@common/decarators/user-agent.decorator';
import { Public } from '@common/decarators/isPublic.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() userDto: LoginUserDto,
    @Res() response: Response,
    @UserAgent() userAgent: string,
  ) {
    const token = await this.authService.login(userDto, response, userAgent);
    return token;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('registration')
  @UsePipes(UserDtoPipe, UniqueEmailPipe)
  async registration(@Body() userDto: CreateUserDto) {
    const user = this.authService.registration(userDto);
    return user;
  }

  @Get('refresh-tokens')
  async refreshTokens(
    @Cookie('refreshtoken') refreshToken: string,
    @Res() response: Response,
    @UserAgent() userAgent: string,
  ) {
    const tokens = await this.authService.refreshTokens(
      refreshToken,
      userAgent,
    );
    this.authService.setRefreshTokenToCookies(tokens, response);
  }
}
