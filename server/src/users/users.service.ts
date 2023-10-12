import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { UsersCityInput } from './dto/users-city.input';
import { CityService } from '@city/city.service';
import { WeatherService } from '@weather/weather.service';
import { UserResgistrationInput } from '@auth/dto/user-registration.input';
import { User } from './models/user.model';
import { City } from '@city/models/city.model';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cityService: CityService,
    private readonly weatherService: WeatherService,
  ) {}

  async addCity(dto: UsersCityInput): Promise<User> {
    try {
      const city = await this.cityService.findOne(dto.cityId);
      await this.weatherService.createWeather(city);
      const user = await this.findOne(dto.userId);
      const updatedCities = [city, ...user.cities];
      const updatedUser: User = await this.updateUserCities(
        dto.userId,
        updatedCities,
      );
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error adding a city',
        error.message,
      );
    }
  }

  async deleteCity(dto: UsersCityInput): Promise<User> {
    try {
      const user = await this.findOne(dto.userId);
      const updatedCities = user.cities.filter(
        (city) => city.id !== dto.cityId,
      );
      const updatedUser = await this.updateUserCities(
        dto.userId,
        updatedCities,
      );
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting a city');
    }
  }

  async create(userDto: UserResgistrationInput): Promise<User> {
    try {
      const { email, password, firstName, lastName } = userDto;
      const user = await this.prisma.user.create({
        data: { email, password, firstName, lastName },
        include: { cities: true },
      });
      return user;
    } catch (error: any) {
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findOne(identifier: string): Promise<User> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { OR: [{ id: identifier }, { email: identifier }] },
        include: {
          token: true,
          cities: true,
        },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error finding user');
    }
  }

  async findUsersWeather(identifier: string): Promise<User> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { OR: [{ id: identifier }, { email: identifier }] },
        include: {
          token: true,
          cities: {
            include: { weather: { include: { currentWeather: true } } },
          },
        },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error finding user');
    }
  }

  private async updateUserCities(userId: string, updatedCities: City[]) {
    const updatedUser: User = await this.prisma.user.update({
      where: { id: userId },
      data: { cities: { set: updatedCities } },
      include: {
        cities: {
          include: { weather: { include: { currentWeather: true } } },
        },
      },
    });
    return updatedUser;
  }
}
