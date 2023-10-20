import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CityInfo {
  @Field()
  sunset: number;
  @Field()
  name: string;
  @Field()
  country: string;
  @Field()
  sunrise: number;
  @Field()
  timezone: number;
  @Field()
  population: number;
}
