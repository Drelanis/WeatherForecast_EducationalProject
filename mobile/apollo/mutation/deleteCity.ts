import { gql } from '@apollo/client';
import { MAIN_CURRENT_WEATHER_FRAGMENT } from 'apollo/fragments/main-current-weather.fragment';

export const DELETE_CITY = gql`
  ${MAIN_CURRENT_WEATHER_FRAGMENT}
  mutation DeleteCity($userId: String!, $cityId: Float!) {
    deleteCity(dto: { userId: $userId, cityId: $cityId }) {
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
