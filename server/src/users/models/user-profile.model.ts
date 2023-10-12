import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserProfile {
  @Field((type) => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  fullName?: string;
}
