import { buildWeatherApi } from '@common/helpers/build-weather-api.helper';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class WeatherApiService {
  constructor(private readonly httpService: HttpService) {}

  async getCurrent(longitude: number, latitude: number) {
    const currentWeather = await this.fetchWeather(
      process.env.CURRENT_WEATHER,
      longitude,
      latitude,
    );
    return currentWeather;
  }

  async getForecast(longitude: number, latitude: number) {
    const forecastWeather = await this.fetchWeather(
      process.env.FORECAST_WEATHER,
      longitude,
      latitude,
    );
    return forecastWeather;
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
}
