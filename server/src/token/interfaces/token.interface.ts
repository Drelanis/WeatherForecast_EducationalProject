import { Token } from '../models/token.model';

export interface ITokens {
  accessToken: string;
  refreshToken: Token;
}
