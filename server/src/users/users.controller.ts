import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDtoPipe } from 'src/users/pipes/user-dto.pipe';
import { UniqueEmailPipe } from './pipes/unique-email.pipe';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @UsePipes(UserDtoPipe, UniqueEmailPipe)
  create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }
}
