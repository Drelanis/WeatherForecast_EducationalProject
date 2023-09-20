import { Args, Query, Resolver } from '@nestjs/graphql';
import { WeatherService } from './weather.service';
import { Weather } from './models/weather.model';

@Resolver()
export class WeatherResolver {
  constructor(private readonly weatherService: WeatherService) {}

  @Query(() => Weather)
  async getWeather(@Args('cityId') cityId: number) {
    const weather = await this.weatherService.getWeather(cityId);
    return weather;
  }
}
