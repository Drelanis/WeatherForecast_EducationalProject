import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from 'src/weather/weather.service';
import { CityResolver } from './city.resolver';

@Module({
  imports: [HttpModule],
  providers: [CityService, WeatherService, CityResolver],
})
export class CityModule {}
