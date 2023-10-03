import { gql } from '@apollo/client';

export const REFRESH = gql`
  mutation Refresh {
    refreshTokens {
      accessToken
    }
  }
`;
