import { Token } from '@prisma/client';
import { ICityToUser } from '@users/interfaces/user.interface';

export interface IJwtPayload {
  id: string;
  email: string;
  cities: ICityToUser[];
  token: Token[];
}
