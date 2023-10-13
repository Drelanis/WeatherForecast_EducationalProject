import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MainWeather {
  @Field()
  temp: number;
  @Field()
  humidity: number;
  @Field()
  pressure: number;
  @Field()
  temp_max: number;
  @Field()
  temp_min: number;
  @Field({ nullable: true })
  sea_level: number;
  @Field()
  feels_like: number;
  @Field({ nullable: true })
  grnd_level: number;
}
