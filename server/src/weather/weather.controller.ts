import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async findOne(@Query('cityId') cityId: number) {
    const weather = await this.weatherService.getWeather(cityId);
    console.log(weather);
    return weather;
  }
}
