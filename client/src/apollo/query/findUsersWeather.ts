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
