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
import { UsersCityDto } from './dto/add-city.dto';
import { DtoPipe } from '../common/pipes/dto.pipe';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':indeficator')
  async findOne(@Param('indeficator') indeficator: string) {
    const user = await this.userService.findOne(indeficator);
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
