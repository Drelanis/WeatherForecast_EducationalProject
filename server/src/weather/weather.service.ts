import { buildWeatherApi } from '@common/helpers/build-weather-api.helper';
import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { ICity } from 'src/city/interfaces/city.interface';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
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

  async createWeather(cityId: number): Promise<void> {
    const city = await this.prisma.city.findFirst({ where: { id: cityId } });
    const weather = await this.prisma.weather.findFirst({
      where: { cityId },
    });
    if (!weather) {
      const newWeather = await this.prisma.weather.create({
        data: {
          cityId,
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
          currentWeather: currentWeather,
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
          forecastWeather: forecastWeather,
        },
      });
    } catch (error) {
      throw new ConflictException('Error getting forecast weather');
    }
  }

  async deleteWeather(cityId: number) {
    const weather = await this.prisma.weather.findFirst({ where: { cityId } });
    await this.deleteCurrentWeather(weather.id);
    await this.deleteForecastWeather(weather.id);
    await this.prisma.weather.delete({ where: { cityId } });
  }

  private async deleteCurrentWeather(weatherId: number) {
    await this.prisma.current_weather.delete({ where: { weatherId } });
  }

  private async deleteForecastWeather(weatherId: number) {
    await this.prisma.forecast_weather.delete({ where: { weatherId } });
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
