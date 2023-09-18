import { buildWeatherApi } from '@common/helpers/build-weather-api.helper';
import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { differenceInHours } from 'date-fns';
import { CityService } from 'src/city/city.service';
import { ICity } from 'src/city/interfaces/city.interface';
import { IWeather } from './interfaces/weather.interface';
import { IForecastWeather } from './interfaces/forecast-weather.interface';
import { ICurrentWeather } from './interfaces/current-weather.interface';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
    private readonly cityService: CityService,
  ) {}

  async getWeather(cityId: number): Promise<IWeather> {
    try {
      const city = await this.cityService.findOne(cityId);
      const weather = await this.prisma.weather.findFirst({
        where: { cityId },
        include: { currentWeather: true, forecastWeather: true },
      });
      await this.updateWeather(weather, city);
      return weather;
    } catch (error) {
      throw new ConflictException('Error getting weather');
    }
  }

  async createWeather(cityId: number): Promise<IWeather> {
    const city = await this.cityService.findOne(cityId);
    const weather = await this.getWeather(cityId);
    await this.updateWeather(weather, city);
    if (!weather) {
      const newWeather = await this.prisma.weather.create({
        data: {
          cityId: city.id,
        },
        include: { currentWeather: true, forecastWeather: true },
      });
      await this.createCurrentWeather(newWeather.id, city);
      await this.createForecastWeather(newWeather.id, city);
      return newWeather;
    }
    return weather;
  }

  async updateWeather(weather: IWeather, city: ICity): Promise<void> {
    if (!this.shouldUpdate(weather)) {
      return;
    }
    const currentDate = new Date();
    const currentWeather = await this.fetchWeather(
      process.env.CURRENT_WEATHER,
      city.longitude,
      city.latitude,
    );
    const forecastWeather = await this.fetchWeather(
      process.env.FORECAST_WEATHER,
      city.longitude,
      city.latitude,
    );
    await this.prisma.current_weather.update({
      where: { id: weather.currentWeather.id },
      data: { currentWeather, updatedAt: currentDate },
    });
    await this.prisma.forecast_weather.update({
      where: { id: weather.forecastWeather.id },
      data: { forecastWeather, updatedAt: currentDate },
    });
    return;
  }

  private async createCurrentWeather(
    weatherId: number,
    city: ICity,
  ): Promise<ICurrentWeather> {
    try {
      const currentWeather = await this.fetchWeather(
        process.env.CURRENT_WEATHER,
        city.longitude,
        city.latitude,
      );
      const newCurrentWeather = await this.prisma.current_weather.create({
        data: {
          weatherId,
          currentWeather,
        },
      });
      return newCurrentWeather;
    } catch (error) {
      throw new ConflictException('Error getting current weather');
    }
  }

  private async createForecastWeather(
    weatherId: number,
    city: ICity,
  ): Promise<IForecastWeather> {
    try {
      const forecastWeather = await this.fetchWeather(
        process.env.FORECAST_WEATHER,
        city.longitude,
        city.latitude,
      );
      const newForecastWeather = await this.prisma.forecast_weather.create({
        data: {
          weatherId,
          forecastWeather,
        },
      });
      return newForecastWeather;
    } catch (error) {
      throw new ConflictException('Error getting forecast weather');
    }
  }

  private async fetchWeather(
    type: string,
    longitude: number,
    latitude: number,
  ) {
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

  private shouldUpdate(weather: IWeather) {
    const currentDate = new Date();
    const updatedCurrentWeatherDate = weather.currentWeather.updatedAt;
    const updatedForecastWeatherDate = weather.forecastWeather.updatedAt;
    if (
      differenceInHours(currentDate, updatedCurrentWeatherDate) <=
        Number(process.env.OPEN_WEATHER_UPDATED_TIME) ||
      differenceInHours(currentDate, updatedForecastWeatherDate) <=
        Number(process.env.OPEN_WEATHER_UPDATED_TIME)
    ) {
      return false;
    }
    return true;
  }
}
