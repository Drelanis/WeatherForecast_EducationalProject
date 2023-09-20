import { City } from '@city/models/city.model';
import { Token } from '@token/models/token.model';

export interface IJwtPayload {
  id: string;
  email: string;
  cities: City[];
  token: Token[];
}
