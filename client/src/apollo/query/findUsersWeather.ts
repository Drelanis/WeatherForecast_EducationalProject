import { gql } from '@apollo/client';

export const FIND_USERS_WEATHER = gql`
  query FindUserWeather($identifier: String!) {
    findUsersWeather(identifier: $identifier) {
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
