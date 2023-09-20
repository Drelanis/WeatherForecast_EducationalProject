import { ObjectType, Field, ID } from '@nestjs/graphql';

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
}
