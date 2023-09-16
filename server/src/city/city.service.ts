import { Injectable } from '@nestjs/common';
import { City } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(cityId: number): Promise<City> {
    const city = await this.prisma.city.findFirst({
      where: { id: cityId },
      include: {
        weather: { include: { currentWeather: true, forecastWeather: true } },
      },
    });
    return city;
  }

  async findMany(name: string): Promise<City[]> {
    const exactCity = await this.prisma.city.findMany({ where: { name } });
    const cities = await this.prisma.city.findMany({
      where: { name: { startsWith: name, not: name } },
    });
    return [...exactCity, ...cities];
  }
}
