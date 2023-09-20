import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CurrentWeather } from './current-weather.model';
import { ForecastWeather } from './forecast-weather.model';

@ObjectType()
export class Weather {
  @Field((type) => ID)
  id: number;

  @Field((type) => ID)
  cityId: number;

  @Field()
  currentWeather?: CurrentWeather;

  @Field()
  forecastWeather?: ForecastWeather;
}
