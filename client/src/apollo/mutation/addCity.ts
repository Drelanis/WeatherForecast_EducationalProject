import { gql } from '@apollo/client';
import { MAIN_CURRENT_WEATHER_FRAGMENT } from '@apolloGraphQL/fragments/main-current-weather.fragment';

export const ADD_CITY = gql`
  ${MAIN_CURRENT_WEATHER_FRAGMENT}
  mutation AddCity($userId: String!, $cityId: Float!) {
    addCity(dto: { userId: $userId, cityId: $cityId }) {
      cities {
        id
        name
        country
        weather {
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
