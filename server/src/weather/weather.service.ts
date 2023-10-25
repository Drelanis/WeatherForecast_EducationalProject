import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CityService } from '@city/city.service';
import { Weather } from './models/weather.model';
import { ForecastWeather } from './models/forecast-weather.model';
import { City } from '@city/models/city.model';
import { CurrentWeatherService } from './current-weather.service';
import { ForecastWeatherService } from './forecast-weather.service';
import { CurrentWeather } from './models/current-weather.model';
import shouldWeatherUpdate from '@common/helpers/should-weather-update.helper';

@Injectable()
export class WeatherService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cityService: CityService,
    private readonly currentWeatherService: CurrentWeatherService,
    private readonly forecastWeatherService: ForecastWeatherService,
  ) {}

  async getCurrentWeather(cityId: number): Promise<CurrentWeather> {
    const weather = await this.getWeather(cityId);
    const city = await this.cityService.findOne(cityId);
    if (shouldWeatherUpdate(weather.currentWeather.updatedAt)) {
      const updatedCurrentWeather = await this.currentWeatherService.update(
        city,
        weather,
      );
      return updatedCurrentWeather;
    }
    return weather.currentWeather;
  }

  async getForecastWeather(cityId: number): Promise<ForecastWeather> {
    const weather = await this.getWeather(cityId);
    if (shouldWeatherUpdate(weather.forecastWeather.updatedAt)) {
      const updatedForecastWeather = await this.forecastWeatherService.update(
        cityId,
        weather,
      );
      return updatedForecastWeather;
    }
    return weather.forecastWeather;
  }

  async updateDashboardWeather(cityIds: number[]): Promise<Weather[]> {
    const weatherOfEachCity = await this.prisma.weather.findMany({
      where: {
        cityId: {
          in: cityIds,
        },
      },
      include: { currentWeather: true },
    });
    const updatedWeatherOfEachCity =
      await this.updateDashboardWeatherOfEachCity(weatherOfEachCity);
    return updatedWeatherOfEachCity;
  }

  async createWeather(city: City): Promise<Weather> {
    try {
      const weather = await this.getWeather(city.id);
      if (!weather) {
        const newWeather = await this.prisma.weather.create({
          data: {
            cityId: city.id,
          },
          include: { currentWeather: true, forecastWeather: true },
        });
        await this.currentWeatherService.create(newWeather.id, city);
        await this.forecastWeatherService.create(newWeather.id, city);
        return newWeather;
      }
      if (shouldWeatherUpdate(weather.currentWeather.updatedAt)) {
        const updatedWeather = await this.updateWeather(weather);
        return updatedWeather;
      }
      return weather;
    } catch (error) {
      throw new InternalServerErrorException('Error creating a weather');
    }
  }

  private async getWeather(cityId: number): Promise<Weather> {
    try {
      const weather = await this.prisma.weather.findFirst({
        where: { cityId },
        include: { currentWeather: true, forecastWeather: true },
      });
      return weather;
    } catch (error) {
      throw new InternalServerErrorException('Error getting weather');
    }
  }

  private async updateDashboardWeatherOfEachCity(weatherOfEachCity: Weather[]) {
    const updatedWeatherOfEachCity = await Promise.all(
      weatherOfEachCity.map(async (weather) => {
        if (shouldWeatherUpdate(weather.currentWeather.updatedAt)) {
          const updatedWeather = await this.updateWeather(weather);
          return updatedWeather;
        }
        return weather;
      }),
    );
    return updatedWeatherOfEachCity;
  }

  private async updateWeather(weather: Weather): Promise<Weather> {
    const city = await this.cityService.findOne(weather.cityId);
    await this.currentWeatherService.update(city, weather);
    const updatedWeather = await this.prisma.weather.findFirst({
      where: { id: weather.id },
      include: { currentWeather: true },
    });
    return updatedWeather;
  }
}
