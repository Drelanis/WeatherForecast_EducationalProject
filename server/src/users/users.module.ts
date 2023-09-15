import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CityService } from 'src/city/city.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CityService],
  exports: [UsersService],
})
export class UsersModule {}
