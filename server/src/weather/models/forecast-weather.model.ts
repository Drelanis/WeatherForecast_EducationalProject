import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ForecastWeatherInfo } from './forecast-weather-info-models/forecast-weather-info.model';

@ObjectType()
export class ForecastWeather {
  @Field((type) => ID)
  id: number;

  @Field((type) => ID)
  weatherId: number;

  @Field()
  updatedAt: Date;

  @Field(() => ForecastWeatherInfo)
  forecastWeather: ForecastWeatherInfo | unknown;
}
