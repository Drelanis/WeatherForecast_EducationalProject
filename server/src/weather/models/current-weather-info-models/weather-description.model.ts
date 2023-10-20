import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WeatherDescription {
  @Field()
  id: number;
  @Field()
  icon: string;
  @Field()
  main: string;
  @Field()
  description: string;
}
