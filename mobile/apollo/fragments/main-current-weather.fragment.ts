import { gql } from '@apollo/client';

export const MAIN_CURRENT_WEATHER_FRAGMENT = gql`
  fragment CurrentWeatherInfo on CurrentWeatherInfo {
    sys {
      sunset
      sunrise
    }
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
    timezone
  }
`;
