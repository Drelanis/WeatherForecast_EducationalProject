import { gql } from '@apollo/client';

export const GET_FORECAST_WEATHER = gql`
  query GetForecastWeather($cityId: Float!) {
    getForecastWeather(cityId: $cityId) {
      forecastWeather {
        city {
          sunset
          country
          sunrise
          timezone
          population
        }
        list {
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
          dt_txt
          visibility
        }
      }
    }
  }
`;
