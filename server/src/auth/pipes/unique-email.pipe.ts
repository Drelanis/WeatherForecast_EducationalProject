import { ConflictException, Inject, PipeTransform } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { UserResgistrationInput } from '@auth/dto/user-registration.input';

export class UniqueEmailPipe implements PipeTransform {
  constructor(
    @Inject(UsersService) private readonly userService: UsersService,
  ) {}

  async transform(value: UserResgistrationInput) {
    const user = await this.userService.findOne(value.email);
    if (user) {
      throw new ConflictException('A user with this email already exists');
    }
    return value;
  }
}
