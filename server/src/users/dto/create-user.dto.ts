import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Email must be string' })
  @IsEmail({}, { message: 'Uncorrect email' })
  email: string;
  @IsString({ message: 'Password must be string' })
  @Length(4, 16, { message: 'Not less 4 and more than 16' })
  password: string;
}
