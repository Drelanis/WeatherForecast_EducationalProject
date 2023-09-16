import { Controller, Get, Query } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private readonly citySrvice: CityService) {}
  @Get()
  async findAll(@Query('name') name: string) {
    const cities = this.citySrvice.findMany(name);
    return cities;
  }
}
