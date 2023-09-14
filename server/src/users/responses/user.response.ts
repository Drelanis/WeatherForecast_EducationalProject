import { Token, User } from '@prisma/client';
import { ICityToUser } from '@users/interfaces/user.interface';
import { Exclude } from 'class-transformer';

export class UserResponse implements User {
  id: string;
  email: string;
  @Exclude()
  password: string;
  cities: ICityToUser[];
  token: Token[];

  constructor(user: User) {
    Object.assign(this, user);
  }
}
