import { Token } from '@prisma/client';
import { ICity } from 'src/city/interfaces/city.interface';

export interface IJwtPayload {
  id: string;
  email: string;
  cities: ICity[];
  token: Token[];
}
