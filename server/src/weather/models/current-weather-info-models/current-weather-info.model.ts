import { Field, ObjectType } from '@nestjs/graphql';
import { SysInfo } from './sys-info.model';
import { MainWeather } from './main-weather.model';
import { WindInfo } from './wind-info.model';
import { WeatherDescription } from './weather-description.model';

@ObjectType()
export class CurrentWeatherInfo {
  @Field()
  sys: SysInfo;

  @Field()
  main: MainWeather;

  @Field()
  wind: WindInfo;

  @Field()
  weather: WeatherDescription;

  @Field()
  timezone: number;

  @Field()
  visibility: number;
}
