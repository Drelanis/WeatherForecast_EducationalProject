import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { WeatherService } from './weather.service';
import { Weather } from './models/weather.model';
import { ForecastWeather } from './models/forecast-weather.model';

@Resolver()
export class WeatherResolver {
  constructor(private readonly weatherService: WeatherService) {}

  @Query(() => [Weather])
  async getDashboardWeather(
    @Args('cityIds', { type: () => [Int] }) cityIds: number[],
  ) {
    const weather = await this.weatherService.getDashboardWeather(cityIds);
    return weather;
  }

  @Query(() => ForecastWeather)
  async getForecastWeather(@Args('cityId') cityId: number) {
    const forecastWeather =
      await this.weatherService.getForecastWeather(cityId);
    return forecastWeather;
  }
}
