import { gql } from '@apollo/client';
import { MAIN_CURRENT_WEATHER_FRAGMENT } from '@apolloGraphQL/fragments/main-current-weather.fragment';

export const GET_CURRENT_WEATHER = gql`
  ${MAIN_CURRENT_WEATHER_FRAGMENT}
  query GetCurrentWeather($cityId: Float!) {
    getCurrentWeather(cityId: $cityId) {
      id
      updatedAt
      currentWeather {
        ...CurrentWeatherInfo
      }
    }
  }
`;
