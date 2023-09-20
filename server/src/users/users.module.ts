import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { CityService } from '@city/city.service';
import { WeatherService } from '@weather/weather.service';
import { HttpModule } from '@nestjs/axios';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [HttpModule],
  providers: [UsersService, UsersResolver, CityService, WeatherService],
  exports: [UsersService],
})
export class UsersModule {}
