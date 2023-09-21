import { ConflictException, Injectable } from '@nestjs/common';
import { City } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(cityId: number): Promise<City> {
    try {
      const city = await this.prisma.city.findFirst({
        where: { id: cityId },
      });
      return city;
    } catch (error) {
      throw new ConflictException('Error getting a city');
    }
  }

  async findMany(name: string): Promise<City[]> {
    try {
      const cities = await this.prisma.city.findMany({
        where: { name: { startsWith: name } },
        orderBy: [{ name: 'asc' }],
      });
      return cities;
    } catch (error) {
      throw new ConflictException('Error finding a cities');
    }
  }
}
