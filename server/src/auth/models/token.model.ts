import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field((type) => ID)
  id: string;

  @Field()
  token: string;

  @Field()
  exp: Date;

  @Field()
  userId: string;

  @Field()
  userAgent: string;
}
