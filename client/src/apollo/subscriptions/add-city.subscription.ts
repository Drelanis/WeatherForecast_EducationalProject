import { gql } from '@apollo/client';
import { MAIN_CURRENT_WEATHER_FRAGMENT } from '@apolloGraphQL/fragments/main-current-weather.fragment';

export const CITIES_UPDATED = gql`
  ${MAIN_CURRENT_WEATHER_FRAGMENT}
  subscription CitiesUpdated($identifier: String!) {
    citiesUpdated(identifier: $identifier) {
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
