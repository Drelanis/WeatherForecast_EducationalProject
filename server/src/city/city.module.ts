import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from 'src/weather/weather.service';

@Module({
  imports: [HttpModule],
  providers: [CityService, WeatherService],
  controllers: [CityController],
})
export class CityModule {}
