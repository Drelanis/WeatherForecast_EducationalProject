import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WindInfo {
  @Field()
  deg: number;
  @Field()
  gust: number;
  @Field()
  speed: number;
}
