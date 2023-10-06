// export interface IMainForecastWeather {
//   temp: number;
//   feels_like: number;
//   visibility: number;
//   wind: {
//     speed: number;
//   };
// }
export interface IMainWeather {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
}

export interface IForecastWeather {
  dt_txt: string;
  main: IMainWeather;
}

export interface IForecastResponse {
  cnt: number;
  name: string;
  country: string;
  city: ICity;
  list: IForecastWeather[];
}

export interface ICity {
  id: number;
  name: string;
  country: string;
  weather: {
    id: number;
    currentWeather: {
      currentWeather: {
        main: IMainWeather;
      };
    };
  };
}
