import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field()
  @IsString({ message: 'Email must be string' })
  @IsEmail({}, { message: 'Uncorrect email' })
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString({ message: 'Password must be string' })
  @Length(4, 16, { message: 'Not less 4 and more than 16' })
  @IsNotEmpty()
  password: string;
}
