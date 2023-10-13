import { gql } from '@apollo/client';
import { MAIN_CURRENT_WEATHER_FRAGMENT } from '@apolloGraphQL/fragments/main-current-weather.fragment';

export const FIND_USERS_CITIES = gql`
  ${MAIN_CURRENT_WEATHER_FRAGMENT}
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
              ...CurrentWeatherInfo
            }
          }
        }
      }
    }
  }
`;
