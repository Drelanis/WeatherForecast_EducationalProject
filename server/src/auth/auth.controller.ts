import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UniqueEmailPipe } from 'src/users/pipes/unique-email.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('registration')
  @UsePipes(UniqueEmailPipe)
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
