import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponse } from './responses/user.response';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':indeficator')
  async findOne(@Param('indeficator') indeficator: string) {
    const user = await this.userService.findOne(indeficator);
    return new UserResponse(user);
  }
}
