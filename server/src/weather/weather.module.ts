import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from './weather.service';
import { CityService } from '@city/city.service';
import { WeatherResolver } from './weather.resolver';
import { WeatherApiService } from 'src/weather-api/weather-api.service';

@Module({
  imports: [HttpModule],
  providers: [WeatherService, CityService, WeatherResolver, WeatherApiService],
  exports: [WeatherService],
})
export class WeatherModule {}
