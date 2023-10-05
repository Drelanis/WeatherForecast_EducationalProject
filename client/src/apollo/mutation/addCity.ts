import { gql } from '@apollo/client';

export const ADD_CITY = gql`
  mutation AddCity($userId: String!, $cityId: Float!) {
    addCity(dto: { userId: $userId, cityId: $cityId }) {
      cities {
        id
        name
        country
        weather {
          currentWeather {
            currentWeather
          }
        }
      }
    }
  }
`;
