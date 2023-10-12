import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SysInfo {
  @Field()
  sunset: number;
  @Field()
  sunrise: number;
}
