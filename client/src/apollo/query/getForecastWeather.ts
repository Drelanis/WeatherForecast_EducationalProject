import { gql } from '@apollo/client';

export const GET_FORECAST_WEATHER = gql`
  query GetForecastWeather($cityId: Float!) {
    getForecastWeather(cityId: $cityId) {
      forecastWeather
    }
  }
`;
