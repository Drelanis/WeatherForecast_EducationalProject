import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UsersCityInput {
  @Field()
  @IsNotEmpty()
  @IsString({ message: 'Incorrect data' })
  readonly userId: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  readonly cityId: number;
}
