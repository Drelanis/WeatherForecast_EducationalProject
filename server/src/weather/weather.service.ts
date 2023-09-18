import { buildWeatherApi } from '@common/helpers/build-weather-api.helper';
import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CityService } from 'src/city/city.service';
import { ICity } from 'src/city/interfaces/city.interface';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
    private readonly cityService: CityService,
  ) {}

  async getWeather(cityId: number) {
    try {
      const weather = await this.prisma.weather.findFirst({
        where: { cityId },
        include: { currentWeather: true, forecastWeather: true },
      });
      return weather;
    } catch (error) {
      throw new ConflictException('Error getting weather');
    }
  }

  async createWeather(cityId: number) {
    const city = await this.cityService.findOne(cityId);
    const weather = await this.prisma.weather.findFirst({
      where: { cityId: city.id },
    });
    if (!weather) {
      const newWeather = await this.prisma.weather.create({
        data: {
          cityId: city.id,
        },
      });
      await this.createCurrentWeather(newWeather.id, city);
      await this.createForecastWeather(newWeather.id, city);
      return;
    }
    return;
  }

  async createCurrentWeather(weatherId: number, city: ICity) {
    try {
      const currentWeather = await this.fetchWeather(
        process.env.CURRENT_WEATHER,
        city.longitude,
        city.latitude,
      );
      await this.prisma.current_weather.create({
        data: {
          weatherId,
          currentWeather,
        },
      });
    } catch (error) {
      throw new ConflictException('Error getting current weather');
    }
  }

  async createForecastWeather(weatherId: number, city: ICity) {
    try {
      const forecastWeather = await this.fetchWeather(
        process.env.FORECAST_WEATHER,
        city.longitude,
        city.latitude,
      );
      await this.prisma.forecast_weather.create({
        data: {
          weatherId,
          forecastWeather,
        },
      });
    } catch (error) {
      throw new ConflictException('Error getting forecast weather');
    }
  }

  async fetchWeather(type: string, longitude: number, latitude: number) {
    try {
      const { data } = await this.httpService.axiosRef.get<any>(
        buildWeatherApi(type, longitude, latitude),
      );
      return data;
    } catch (error) {
      throw new BadRequestException(
        'An error occurred while fetching data from the API',
      );
    }
  }
}
