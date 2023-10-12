import { Field, ObjectType } from '@nestjs/graphql';
import { CurrentWeatherInfo } from '../current-weather-info-models/current-weather-info.model';

@ObjectType()
export class ForecastWeatherInfo {
  @Field()
  sunset: number;
  @Field()
  country: string;
  @Field()
  sunrise: number;
  @Field()
  timezone: number;
  @Field()
  population: number;
  @Field(() => [CurrentWeatherInfo])
  list: [CurrentWeatherInfo];
}
