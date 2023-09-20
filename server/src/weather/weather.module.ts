import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from './weather.service';
import { CityService } from '@city/city.service';
import { WeatherResolver } from './weather.resolver';

@Module({
  imports: [HttpModule],
  providers: [WeatherService, CityService, WeatherResolver],
  exports: [WeatherService],
})
export class WeatherModule {}
