import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@prisma/prisma.service';
import { City } from './models/city.model';

@Injectable()
export class CityService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configSerive: ConfigService,
  ) {}

  async findOne(cityId: number): Promise<City> {
    try {
      const city = await this.prisma.city.findFirst({
        where: { id: cityId },
        // include: { weather: { include: { currentWeather: true } } },
      });
      return city;
    } catch (error) {
      throw new InternalServerErrorException('Error getting a city');
    }
  }

  async findMany(name: string): Promise<City[]> {
    try {
      if (!name || !name.trim()) {
        return [];
      }
      const cities = await this.prisma.city.findMany({
        where: { name: { startsWith: name, mode: 'insensitive' } },
        orderBy: [{ name: this.configSerive.get('ASCENDING') }],
      });
      return cities;
    } catch (error) {
      throw new InternalServerErrorException('Error getting a city');
    }
  }
}
