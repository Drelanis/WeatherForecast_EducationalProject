import { gql } from '@apollo/client';
import { MAIN_CURRENT_WEATHER_FRAGMENT } from 'apollo/fragments/main-current-weather.fragment';

export const UPDATED_CURRENT_WEATHER = gql`
  ${MAIN_CURRENT_WEATHER_FRAGMENT}
  subscription UpdatedCurrentWeather($id: Float!) {
    currentWeatherUpdated(id: $id) {
      id
      updatedAt
      currentWeather {
        ...CurrentWeatherInfo
      }
    }
  }
`;
