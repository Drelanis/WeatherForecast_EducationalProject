import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { City } from '@city/models/city.model';
import { Token } from '@auth/models/token.model';

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @HideField()
  password: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  fullName?: string;

  @Field((type) => [City])
  cities?: City[];

  @Field((type) => [Token])
  token?: Token[];
}
