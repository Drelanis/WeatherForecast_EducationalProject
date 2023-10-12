import { Field, ObjectType } from '@nestjs/graphql';
import { CityInfo } from './city-info.model';
import { ForecastModel } from './forecast.model';

@ObjectType()
export class ForecastWeatherInfo {
  @Field(() => CityInfo)
  city: CityInfo;
  @Field(() => [ForecastModel])
  list: [ForecastModel];
}
