import { gql } from '@apollo/client';
import { MAIN_FORECAST_WEATHER_FRAGMENT } from '@apolloGraphQL/fragments/main-forecast-weather.fragment';

export const GET_FORECAST_WEATHER = gql`
  ${MAIN_FORECAST_WEATHER_FRAGMENT}
  query GetForecastWeather($cityId: Float!) {
    getForecastWeather(cityId: $cityId) {
      forecastWeather {
        ...ForecastWeatherInfo
      }
    }
  }
`;
