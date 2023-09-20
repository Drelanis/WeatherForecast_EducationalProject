import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from 'src/weather/weather.service';
import { CityResolver } from './city.resolver';

@Module({
  imports: [HttpModule],
  providers: [CityService, WeatherService, CityResolver],
  controllers: [CityController],
})
export class CityModule {}
