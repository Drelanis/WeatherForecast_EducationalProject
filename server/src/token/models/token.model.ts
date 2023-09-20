import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field()
  token: string;

  @Field()
  exp: Date;

  @Field()
  userId: string;

  @Field()
  userAgent: string;
}
