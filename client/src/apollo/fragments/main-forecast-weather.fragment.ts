import { gql } from '@apollo/client';

export const MAIN_FORECAST_WEATHER_FRAGMENT = gql`
  fragment ForecastWeatherInfo on ForecastWeatherInfo {
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
      visibility
      dt_txt
    }
  }
`;
