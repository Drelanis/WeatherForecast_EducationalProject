import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { CityService } from '@city/city.service';
import { WeatherService } from '@weather/weather.service';
import { HttpModule } from '@nestjs/axios';
import { UsersResolver } from './users.resolver';
import { WeatherApiService } from 'src/weather-api/weather-api.service';

@Module({
  imports: [HttpModule],
  providers: [
    UsersService,
    UsersResolver,
    CityService,
    WeatherService,
    WeatherApiService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
