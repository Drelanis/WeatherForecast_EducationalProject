import { IsPasswordsMatchingConstraint } from '@auth/decarators/is-passwords-matching-constraint.decorator';
import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
} from 'class-validator';

@InputType()
export class UserResgistrationInput {
  @Field()
  @IsString({ message: 'Email - must be string' })
  @IsEmail({}, { message: 'Email - Check the correct spelling of the email' })
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString({ message: 'Password - must be string' })
  @Length(4, 16, { message: 'Password - must be not less 4 and more than 16' })
  @IsNotEmpty()
  password: string;

  @Field()
  @IsString()
  @Validate(IsPasswordsMatchingConstraint)
  @IsNotEmpty()
  passwordRepeat: string;
}
