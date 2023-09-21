import { Token } from '@auth/models/token.model';

export interface ITokens {
  accessToken: string;
  refreshToken: Token;
}
