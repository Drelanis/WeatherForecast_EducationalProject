import { UserResgistrationInput } from '@auth/dto/user-registration.input';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsPasswordsMatching', async: false })
export class IsPasswordsMatchingConstraint
  implements ValidatorConstraintInterface
{
  validate(passwordRepeat: string, args: ValidationArguments) {
    const obj = args.object as UserResgistrationInput;
    return obj.password === passwordRepeat;
  }

  defaultMessage(): string {
    return 'Password - mismatch';
  }
}
