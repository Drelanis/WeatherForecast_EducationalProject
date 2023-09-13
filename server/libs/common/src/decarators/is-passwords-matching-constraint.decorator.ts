import { CreateUserDto } from '@users/dto/create-user.dto';
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
    const obj = args.object as CreateUserDto;
    return obj.password === passwordRepeat;
  }

  defaultMessage(): string {
    return 'Passwords mismatch';
  }
}
