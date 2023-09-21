import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { IUser } from './interfaces/user.interface';
import { UsersCityInput } from './dto/users-city.input';
import { CityService } from '@city/city.service';
import { WeatherService } from '@weather/weather.service';
import { UserResgistrationInput } from '@auth/dto/user-registration.input';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cityService: CityService,
    private readonly weatherService: WeatherService,
  ) {}

  async addCity(dto: UsersCityInput): Promise<IUser> {
    try {
      await this.weatherService.createWeather(dto.cityId);
      const city = await this.cityService.findOne(dto.cityId);
      const user = await this.findOne(dto.userId);
      const updatedCities = [city, ...user.cities];
      const updatedUser = await this.prisma.user.update({
        where: { id: dto.userId },
        data: { cities: { set: updatedCities } },
        include: {
          cities: {
            include: { weather: { include: { currentWeather: true } } },
          },
        },
      });
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error adding a city',
        error.message,
      );
    }
  }

  async deleteCity(dto: UsersCityInput): Promise<IUser> {
    try {
      const user = await this.findOne(dto.userId);
      const updatedCities = user.cities.filter(
        (city) => city.id !== dto.cityId,
      );
      const updatedUser = await this.prisma.user.update({
        where: { id: dto.userId },
        data: {
          cities: { set: updatedCities },
        },
        include: { cities: true },
      });
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting a city');
    }
  }

  async create(userDto: UserResgistrationInput): Promise<IUser> {
    try {
      const { email, password } = userDto;
      const user = await this.prisma.user.create({
        data: { email, password },
        include: { cities: true },
      });
      return user;
    } catch (error: any) {
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findOne(identifier: string): Promise<IUser> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { OR: [{ id: identifier }, { email: identifier }] },
        include: {
          cities: true,
          token: true,
        },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error finding user');
    }
  }
}
