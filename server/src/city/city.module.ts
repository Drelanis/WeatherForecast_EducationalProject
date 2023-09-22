import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from 'src/weather/weather.service';
import { CityResolver } from './city.resolver';
import { WeatherApiService } from '@weather/weather-api.service';
import { CurrentWeatherService } from '@weather/current-weather.service';
import { ForecastWeatherService } from '@weather/forecast-weather.service';

@Module({
  imports: [HttpModule],
  providers: [
    CityService,
    WeatherService,
    CityResolver,
    WeatherApiService,
    CurrentWeatherService,
    ForecastWeatherService,
  ],
})
export class CityModule {}
