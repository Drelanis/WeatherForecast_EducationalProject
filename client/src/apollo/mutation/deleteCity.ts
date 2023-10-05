import { gql } from '@apollo/client';

export const DELETE_CITY = gql`
  mutation DeleteCity($userId: String!, $cityId: Float!) {
    deleteCity(dto: { userId: $userId, cityId: $cityId }) {
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
