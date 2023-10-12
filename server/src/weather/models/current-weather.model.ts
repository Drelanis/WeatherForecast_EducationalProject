import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CurrentWeatherInfo } from './current-weather-info-models/current-weather-info.model';

@ObjectType()
export class CurrentWeather {
  @Field((type) => ID)
  id: number;

  @Field((type) => ID)
  weatherId: number;

  @Field()
  updatedAt: Date;

  @Field(() => CurrentWeatherInfo)
  currentWeather: CurrentWeatherInfo | unknown;
}
