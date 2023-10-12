import { gql } from '@apollo/client';

export const FIND_USERS_CITIES = gql`
  query FindUsersCities($identifier: String!) {
    findUsersCities(identifier: $identifier) {
      cities {
        id
        name
        country
        weather {
          id
          currentWeather {
            currentWeather
          }
        }
      }
    }
  }
`;
