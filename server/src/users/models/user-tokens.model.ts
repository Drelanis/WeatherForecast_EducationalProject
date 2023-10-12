import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Token } from '@auth/models/token.model';

@ObjectType()
export class UserTokens {
  @Field((type) => ID)
  id: string;

  @Field((type) => [Token])
  token?: Token[];
}
