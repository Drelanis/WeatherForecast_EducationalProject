import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from 'src/weather/weather.service';
import { CityResolver } from './city.resolver';
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
    CityService,
    WeatherService,
    CityResolver,
    WeatherApiService,
    CurrentWeatherService,
    ForecastWeatherService,
  ],
})
export class CityModule {}
