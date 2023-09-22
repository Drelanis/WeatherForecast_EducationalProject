import { City } from '@city/models/city.model';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ForecastWeather } from './models/forecast-weather.model';
import { WeatherApiService } from '@weather/weather-api.service';
import { PrismaService } from '@prisma/prisma.service';
import { Weather } from './models/weather.model';
import { CityService } from '@city/city.service';
import { differenceInHours, differenceInSeconds } from 'date-fns';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ForecastWeatherService {
  constructor(
    private readonly weatherApi: WeatherApiService,
    private readonly prisma: PrismaService,
    private readonly cityService: CityService,
    private readonly configService: ConfigService,
  ) {}

  async update(cityId: number, weather: Weather): Promise<ForecastWeather> {
    const currentDate = new Date();
    const city = await this.cityService.findOne(cityId);
    const forecastWeather = await this.weatherApi.getForecast(
      city.longitude,
      city.latitude,
    );
    return await this.prisma.forecast_weather.update({
      where: { id: weather.forecastWeather.id },
      data: { forecastWeather, updatedAt: currentDate },
    });
  }

  async create(weatherId: number, city: City): Promise<ForecastWeather> {
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
      throw new InternalServerErrorException('Error creating forecast weather');
    }
  }

  shouldUpdate(forecastWeather: ForecastWeather) {
    const currentDate = new Date();
    const updatedForecastWeatherDate = forecastWeather.updatedAt;
    if (
      differenceInHours(currentDate, updatedForecastWeatherDate) <=
      Number(this.configService.get('OPEN_WEATHER_UPDATED_TIME'))
    ) {
      return false;
    }
    return true;
  }
}
