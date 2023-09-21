import { City } from '@city/models/city.model';
import { Token } from '@auth/models/token.model';

export interface IUser {
  id: string;
  email: string;
  password: string;
  cities?: City[];
  token?: Token[];
}
