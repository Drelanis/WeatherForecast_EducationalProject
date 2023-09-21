import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { differenceInHours } from 'date-fns';
import { CityService } from '@city/city.service';
import { Weather } from './models/weather.model';
import { CurrentWeather } from './models/current-weather.model';
import { ForecastWeather } from './models/forecast-weather.model';
import { City } from '@city/models/city.model';
import { WeatherApiService } from 'src/weather-api/weather-api.service';

@Injectable()
export class WeatherService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cityService: CityService,
    private readonly weatherApi: WeatherApiService,
  ) {}

  async getForecastWeather(cityId: number): Promise<Weather> {
    const weather = await this.getWeather(cityId);
    if (this.shouldUpdate(weather)) {
      const updatedWeather = await this.updateWeather(weather, cityId);
      return updatedWeather;
    }
    return weather;
  }

  async getAllWeather(cityIds: number[]): Promise<Weather[]> {
    const weatherOfEachCity = await this.prisma.weather.findMany({
      where: {
        cityId: {
          in: cityIds,
        },
      },
      include: { currentWeather: true, forecastWeather: true },
    });
    const updatedWeatherOfEachCity =
      await this.updateAllWeather(weatherOfEachCity);
    return updatedWeatherOfEachCity;
  }

  async createWeather(cityId: number): Promise<Weather> {
    const city = await this.cityService.findOne(cityId);
    const weather = await this.getWeather(cityId);
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
    await this.updateWeather(weather, cityId);
    return weather;
  }

  private async getWeather(cityId: number): Promise<Weather> {
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

  private async updateAllWeather(weatherOfEachCity: Weather[]) {
    const updatedWeatherOfEachCity = await Promise.all(
      weatherOfEachCity.map(async (weather) => {
        if (this.shouldUpdate(weather)) {
          return await this.updateWeather(weather, weather.cityId);
        }
        return weather;
      }),
    );
    return updatedWeatherOfEachCity;
  }

  private async updateWeather(
    weather: Weather,
    cityId: number,
  ): Promise<Weather> {
    const city = await this.cityService.findOne(cityId);
    const currentDate = new Date();
    const currentWeather = await this.weatherApi.getCurrent(
      city.longitude,
      city.latitude,
    );
    const forecastWeather = await this.weatherApi.getForecast(
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
    const updatedWeather = await this.prisma.weather.findFirst({
      where: { cityId },
      include: { currentWeather: true, forecastWeather: true },
    });
    return updatedWeather;
  }

  private async createCurrentWeather(
    weatherId: number,
    city: City,
  ): Promise<CurrentWeather> {
    try {
      const currentWeather = await this.weatherApi.getCurrent(
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
    city: City,
  ): Promise<ForecastWeather> {
    try {
      const forecastWeather = await this.weatherApi.getForecast(
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

  private shouldUpdate(weather: Weather) {
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
