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
import { CreateUserDto } from '@users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UniqueEmailPipe } from '@users/pipes/unique-email.pipe';
import { UserDtoPipe } from '@users/pipes/user-dto.pipe';
import { LoginUserDto } from './dto/login-user.dto';
import { Cookie } from 'src/common/decarators/get-cookies.decarator';
import { UserAgent } from 'src/common/decarators/user-agent.decorator';
import { Public } from 'src/common/decarators/isPublic.decorator';
import { TokenService } from './token.service';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

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
