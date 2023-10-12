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
            currentWeather {
              sys {
                sunset
                sunrise
              }
              main {
                temp
                humidity
                pressure
                temp_max
                temp_min
                sea_level
                feels_like
                grnd_level
              }
              wind {
                deg
                gust
                speed
              }
              weather {
                id
                icon
                main
                description
              }
              timezone
              visibility
            }
          }
        }
      }
    }
  }
`;
