import { City } from '@city/models/city.model';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { WeatherApiService } from '@weather/weather-api.service';
import { PrismaService } from '@prisma/prisma.service';
import { CurrentWeather } from './models/current-weather.model';
import { Weather } from './models/weather.model';
import { differenceInHours, differenceInSeconds } from 'date-fns';
import { ConfigService } from '@nestjs/config';
import pubSub from '@common/helpers/pub-sub.helper';

@Injectable()
export class CurrentWeatherService {
  constructor(
    private readonly weatherApi: WeatherApiService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async update(city: City, weather: Weather): Promise<CurrentWeather> {
    const currentDate = new Date();
    const currentWeather = await this.weatherApi.getCurrent(
      city.longitude,
      city.latitude,
    );
    const updatedCurrentWeather = await this.prisma.current_weather.update({
      where: { id: weather.currentWeather.id },
      data: { currentWeather, updatedAt: currentDate },
    });
    pubSub.publish(`currentWeatherUpdated_${weather.currentWeather.id}`, {
      currentWeatherUpdated: updatedCurrentWeather,
    });
    return updatedCurrentWeather;
  }

  async create(weatherId: number, city: City): Promise<CurrentWeather> {
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
      throw new InternalServerErrorException('Error creating current weather');
    }
  }

  shouldUpdate(currentWeather: CurrentWeather) {
    const currentDate = new Date();
    const updatedCurrentWeatherDate = currentWeather.updatedAt;
    if (
      differenceInHours(currentDate, updatedCurrentWeatherDate) <=
      Number(this.configService.get('OPEN_WEATHER_UPDATED_TIME'))
    ) {
      return false;
    }
    return true;
  }
}
