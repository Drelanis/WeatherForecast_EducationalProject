import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { WeatherService } from './weather.service';
import { Weather } from './models/weather.model';

@Resolver()
export class WeatherResolver {
  constructor(private readonly weatherService: WeatherService) {}

  @Query(() => [Weather])
  async getAllWeather(
    @Args('cityIds', { type: () => [Int] }) cityIds: number[],
  ) {
    const weather = await this.weatherService.getAllWeather(cityIds);
    return weather;
  }

  @Query(() => Weather)
  async getForecastWeather(@Args('cityId') cityId: number) {
    const weather = await this.weatherService.getForecastWeather(cityId);
    return weather;
  }
}
