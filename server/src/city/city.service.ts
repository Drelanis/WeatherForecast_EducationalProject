import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}
  findOne(id: number) {
    const city = this.prisma.city.findFirst({ where: { id } });
    return city;
  }

  async findMany(name: string) {
    const exactCity = await this.prisma.city.findMany({ where: { name } });
    const cities = await this.prisma.city.findMany({
      where: { name: { startsWith: name, not: name } },
    });
    return [...exactCity, ...cities];
  }
}
