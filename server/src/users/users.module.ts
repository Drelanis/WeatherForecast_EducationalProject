import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CityService } from 'src/city/city.service';
import { WeatherService } from 'src/weather/weather.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [UsersController],
  providers: [UsersService, CityService, WeatherService],
  exports: [UsersService],
})
export class UsersModule {}
