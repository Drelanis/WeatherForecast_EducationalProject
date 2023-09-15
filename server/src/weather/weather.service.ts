import { buildWeatherApi } from '@common/helpers/build-weather-api.helper';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  private async find(type: string, longitude: number, latitude: number) {
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
