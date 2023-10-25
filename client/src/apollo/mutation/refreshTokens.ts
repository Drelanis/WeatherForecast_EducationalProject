import { gql } from '@apollo/client';

export const REFRESH = gql`
  mutation RefreshTokens {
    refreshTokens {
      userId
    }
  }
`;
