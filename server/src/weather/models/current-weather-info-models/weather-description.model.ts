import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WeatherDescription {
  @Field({ nullable: true })
  id: number;
  @Field({ nullable: true })
  icon: string;
  @Field({ nullable: true })
  main: string;
  @Field({ nullable: true })
  description: string;
}
