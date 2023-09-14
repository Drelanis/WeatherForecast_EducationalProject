import { Controller, Post, Body, UsePipes, Get, Res } from '@nestjs/common';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UniqueEmailPipe } from '@users/pipes/unique-email.pipe';
import { UserDtoPipe } from '@users/pipes/user-dto.pipe';
import { LoginUserDto } from './dto/login-user.dto';
import { Cookie } from '@common/decarators/get-cookies.decarator';
import { UserAgent } from '@common/decarators/user-agent.decorator';
import { Public } from '@common/decarators/isPublic.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body() userDto: LoginUserDto,
    @Res() response: Response,
    @UserAgent() userAgent: string,
  ) {
    const token = await this.authService.login(userDto, response, userAgent);
    return token;
  }

  @Post('registration')
  @UsePipes(UserDtoPipe, UniqueEmailPipe)
  async registration(@Body() userDto: CreateUserDto) {
    const token = this.authService.registration(userDto);
    return token;
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
