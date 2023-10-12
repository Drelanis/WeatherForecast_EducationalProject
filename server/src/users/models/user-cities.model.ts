import { Field, ID, ObjectType } from '@nestjs/graphql';
import { City } from '@city/models/city.model';

@ObjectType()
export class UserCities {
  @Field((type) => ID)
  id: string;

  @Field((type) => [City])
  cities: City[];
}
