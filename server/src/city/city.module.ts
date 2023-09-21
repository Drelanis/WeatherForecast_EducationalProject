import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from 'src/weather/weather.service';
import { CityResolver } from './city.resolver';
import { WeatherApiService } from 'src/weather-api/weather-api.service';

@Module({
  imports: [HttpModule],
  providers: [CityService, WeatherService, CityResolver, WeatherApiService],
})
export class CityModule {}
