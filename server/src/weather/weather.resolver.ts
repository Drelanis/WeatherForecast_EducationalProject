import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import { WeatherService } from './weather.service';
import { ForecastWeather } from './models/forecast-weather.model';
import { CurrentWeather } from './models/current-weather.model';
import { Public } from '@common/decarators/isPublic.decorator';
import pubSub from '@common/helpers/pub-sub.helper';

@Resolver()
export class WeatherResolver {
  constructor(private readonly weatherService: WeatherService) {}

  @Public()
  @Subscription(() => CurrentWeather, {
    filter: (payload, variables) => {
      return payload.currentWeatherUpdated.id === variables.id;
    },
  })
  currentWeatherUpdated(@Args('id') id: number) {
    return pubSub.asyncIterator(`currentWeatherUpdated_${id}`);
  }

  @Query(() => CurrentWeather)
  async getCurrentWeather(@Args('cityId') cityId: number) {
    const currentWeather = await this.weatherService.getCurrentWeather(cityId);
    return currentWeather;
  }

  @Query(() => ForecastWeather)
  async getForecastWeather(@Args('cityId') cityId: number) {
    const forecastWeather =
      await this.weatherService.getForecastWeather(cityId);
    return forecastWeather;
  }
}
