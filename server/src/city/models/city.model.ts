import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Weather } from '@weather/models/weather.model';

@ObjectType()
export class City {
  @Field((type) => ID)
  id: number;
  @Field()
  name: string;
  @Field()
  country: string;
  @Field()
  longitude: number;
  @Field()
  latitude: number;
  @Field()
  weather?: Weather;
}
