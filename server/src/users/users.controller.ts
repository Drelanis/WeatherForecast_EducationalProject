import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from 'src/users/pipes/validation.pipe';
import { UniqueEmailPipe } from './pipes/unique-email.pipe';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe, UniqueEmailPipe)
  create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }
}
