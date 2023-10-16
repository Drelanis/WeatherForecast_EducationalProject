import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { CityService } from '@city/city.service';
import { WeatherService } from '@weather/weather.service';
import { HttpModule } from '@nestjs/axios';
import { UsersResolver } from './users.resolver';
import { WeatherApiService } from '@weather/weather-api.service';
import { CurrentWeatherService } from '@weather/current-weather.service';
import { ForecastWeatherService } from '@weather/forecast-weather.service';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    UsersService,
    UsersResolver,
    CityService,
    WeatherService,
    WeatherApiService,
    CurrentWeatherService,
    ForecastWeatherService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
