import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { CityService } from 'src/city/city.service';
import { WeatherResolver } from './weather.resolver';

@Module({
  imports: [HttpModule],
  providers: [WeatherService, CityService, WeatherResolver],
  controllers: [WeatherController],
  exports: [WeatherService],
})
export class WeatherModule {}
