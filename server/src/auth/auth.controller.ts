import {
  Controller,
  Post,
  Body,
  UsePipes,
  Get,
  Res,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { DtoPipe } from '@common/pipes/dto.pipe';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { Public } from '@common/decarators/isPublic.decorator';
import { UniqueEmailPipe } from '@users/pipes/unique-email.pipe';
import { Cookie } from '@common/decarators/get-cookies.decarator';
import { UserAgent } from '@common/decarators/user-agent.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  @UsePipes(DtoPipe, UniqueEmailPipe)
  @Post('registration')
  async registration(@Body() userDto: CreateUserDto) {
    const user = this.authService.registration(userDto);
    return user;
  }

  @Get('logout')
  async logout(
    @Cookie('refreshtoken') refreshToken: string,
    @Res() response: Response,
  ) {
    if (!refreshToken) {
      return response.sendStatus(HttpStatus.OK);
    }
    await this.authService.logout(refreshToken, response);
    response.sendStatus(HttpStatus.OK);
  }
}
