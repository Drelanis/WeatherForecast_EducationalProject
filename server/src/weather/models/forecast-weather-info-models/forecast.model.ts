import { Field, ObjectType } from '@nestjs/graphql';
import { MainWeather } from '../current-weather-info-models/main-weather.model';
import { WindInfo } from '../current-weather-info-models/wind-info.model';
import { WeatherDescription } from '../current-weather-info-models/weather-description.model';

@ObjectType()
export class ForecastModel {
  @Field()
  main: MainWeather;

  @Field()
  wind: WindInfo;

  @Field()
  weather: WeatherDescription;

  @Field()
  visibility: number;

  @Field({ nullable: true })
  dt_txt: string;
}
