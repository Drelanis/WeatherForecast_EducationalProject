import { Field, ID, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class CurrentWeather {
  @Field((type) => ID)
  id: number;

  @Field((type) => ID)
  weatherId: number;

  @Field()
  updatedAt: Date;

  @Field(() => GraphQLJSON)
  currentWeather: any;
}
