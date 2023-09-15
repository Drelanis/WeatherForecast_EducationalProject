import { ICity } from 'src/city/interfaces/city.interface';

export interface IUser {
  id: string;
  email: string;
  password: string;
  cities?: ICity[];
}
