import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { UsersCityInput } from './dto/users-city.input';
import { CityService } from '@city/city.service';
import { WeatherService } from '@weather/weather.service';
import { UserResgistrationInput } from '@auth/dto/user-registration.input';
import { User } from './models/user.model';
import { City } from '@city/models/city.model';
import { UserCities } from './models/user-cities.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cityService: CityService,
    private readonly weatherService: WeatherService,
    private readonly configService: ConfigService,
  ) {}

  async addCity(dto: UsersCityInput): Promise<User> {
    try {
      const city = await this.cityService.findOne(dto.cityId);
      await this.weatherService.createWeather(city);
      const user = await this.findOne(dto.userId);
      if (this.checkTheSameCity(user.cities, city.id)) {
        throw new BadRequestException(`The city is already in the user's list`);
      }
      if (this.checkCitiesLimit(user.cities.length)) {
        throw new BadRequestException(
          `It is not possible to add more than six cities`,
        );
      }
      const updatedCities = [city, ...user.cities];
      const updatedUser: User = await this.updateUserCities(
        dto.userId,
        updatedCities,
      );
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
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

  async findUsersCities(identifier: string): Promise<UserCities> {
    try {
      const updatedUser = await this.prisma.user.findFirst({
        where: { OR: [{ id: identifier }, { email: identifier }] },
        include: {
          token: true,
          cities: {
            include: { weather: { include: { currentWeather: true } } },
          },
        },
      });
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException('Error get cities');
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

  private checkTheSameCity(cities: City[], cityId: number) {
    return cities.some((city) => city.id === cityId);
  }

  private checkCitiesLimit(number: number) {
    return number >= Number(this.configService.get('THE_MAX_NUMBER_OF_CITIES'));
  }
}
