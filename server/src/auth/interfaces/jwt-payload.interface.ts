import { City } from '@city/models/city.model';
import { Token } from '@auth/models/token.model';

export interface IJwtPayload {
  id: string;
  email: string;
  cities: City[];
  token: Token[];
}
