import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from './weather.service';
import { CityService } from '@city/city.service';
import { WeatherResolver } from './weather.resolver';
import { WeatherApiService } from '@weather/weather-api.service';
import { ForecastWeatherService } from './forecast-weather.service';
import { CurrentWeatherService } from './current-weather.service';
import { UsersService } from '@users/users.service';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [HttpModule],
  providers: [
    WeatherService,
    CityService,
    WeatherResolver,
    WeatherApiService,
    ForecastWeatherService,
    CurrentWeatherService,
  ],
  exports: [WeatherService],
})
export class WeatherModule {}
