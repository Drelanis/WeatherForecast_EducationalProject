import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { City } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';

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
      });
      return city;
    } catch (error) {
      throw new InternalServerErrorException('Error getting a city');
    }
  }

  async findMany(name: string): Promise<City[]> {
    try {
      const cities = await this.prisma.city.findMany({
        where: { name: { startsWith: name } },
        orderBy: [{ name: this.configSerive.get('ASCENDING') }],
      });
      throw new Error();
      return cities;
    } catch (error) {
      throw new InternalServerErrorException('Error getting a city');
    }
  }
}
