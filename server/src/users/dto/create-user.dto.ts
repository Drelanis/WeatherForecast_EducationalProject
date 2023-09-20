import { IsPasswordsMatchingConstraint } from '@auth/decarators/is-passwords-matching-constraint.decorator';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Email must be string' })
  @IsEmail({}, { message: 'Uncorrect email' })
  @IsNotEmpty()
  email: string;

  @IsString({ message: 'Password must be string' })
  @Length(4, 16, { message: 'Not less 4 and more than 16' })
  @IsNotEmpty()
  password: string;

  @IsString()
  @Length(4, 16, { message: 'Not less 4 and more than 16' })
  @Validate(IsPasswordsMatchingConstraint)
  @IsNotEmpty()
  passwordRepeat: string;
}
