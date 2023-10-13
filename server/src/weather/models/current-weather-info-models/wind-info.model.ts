import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WindInfo {
  @Field({ nullable: true })
  deg: number;
  @Field({ nullable: true })
  gust: number;
  @Field({ nullable: true })
  speed: number;
}
