import { Token, User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ICity } from 'src/city/interfaces/city.interface';

export class UserResponse implements User {
  id: string;
  email: string;
  @Exclude()
  password: string;
  cities: ICity[];
  token: Token[];

  constructor(user: User) {
    Object.assign(this, user);
  }
}
