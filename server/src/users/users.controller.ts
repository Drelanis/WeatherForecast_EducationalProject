import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponse } from './responses/user.response';
import { UsersCityDto } from './dto/users-city.dto';
import { DtoPipe } from '../common/pipes/dto.pipe';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':identifier')
  async findOne(@Param('identifier') identifier: string) {
    const user = await this.userService.findOne(identifier);
    return new UserResponse(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('city')
  @UsePipes(DtoPipe)
  async addCity(@Body() dto: UsersCityDto) {
    const user = await this.userService.addCity(dto);
    return new UserResponse(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('city')
  @UsePipes(DtoPipe)
  async deleteCity(@Body() dto: UsersCityDto) {
    const user = await this.userService.deleteCity(dto);
    return new UserResponse(user);
  }
}
