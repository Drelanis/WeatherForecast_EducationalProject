import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { UsersCityDto } from './dto/add-city.dto';
import { CityService } from 'src/city/city.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cityService: CityService,
  ) {}

  async deleteCity(dto: UsersCityDto) {
    try {
      const user = await this.findOne(dto.userId);
      const updatedCities = user.cities.filter(
        (city) => city.id !== dto.cityId,
      );
      return await this.prisma.user.update({
        where: { id: dto.userId },
        data: { cities: { set: updatedCities } },
        include: { cities: true },
      });
    } catch (error) {
      throw new ConflictException('Error deleting a city');
    }
  }

  async addCity(dto: UsersCityDto) {
    try {
      const city = await this.cityService.findOne(dto.cityId);
      const user = await this.findOne(dto.userId);
      const updatedCities = [city, ...user.cities];
      return await this.prisma.user.update({
        where: { id: dto.userId },
        data: { cities: { set: updatedCities } },
        include: { cities: true },
      });
    } catch (error) {
      throw new ConflictException('Error adding a city');
    }
  }

  async create(userDto: CreateUserDto): Promise<IUser> {
    try {
      const { email, password } = userDto;
      const user = await this.prisma.user.create({
        data: { email, password },
      });
      return user;
    } catch (error: any) {
      throw new ConflictException('Error creating user');
    }
  }

  async findOne(identifier: string): Promise<IUser> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { OR: [{ id: identifier }, { email: identifier }] },
        include: { cities: true },
      });
      return user;
    } catch (error) {
      throw new ConflictException('Error finding user');
    }
  }
}
