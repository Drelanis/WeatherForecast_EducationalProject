import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UniqueEmailPipe } from '@users/pipes/unique-email.pipe';
import { UserDtoPipe } from '@users/pipes/user-dto.pipe';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(UserDtoPipe)
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @Post('registration')
  @UsePipes(UserDtoPipe, UniqueEmailPipe)
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
