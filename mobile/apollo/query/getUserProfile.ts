import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
  query GetUserProfile($identifier: String!) {
    getUser(identifier: $identifier) {
      fullName
      email
    }
  }
`;
