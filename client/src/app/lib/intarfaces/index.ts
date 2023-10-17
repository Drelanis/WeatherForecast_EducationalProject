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

export interface IWeatehrDescription {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface ICity {
  id: number;
  name: string;
  country: string;
  weather: {
    id: number;
    currentWeather: {
      currentWeather: {
        timezone: number;
        wind: {
          deg: number;
          gust: number;
          speed: number;
        };
        weather: IWeatehrDescription[];
        main: IMainWeather;
      };
    };
  };
}

export interface IUserProfile {
  getUser: {
    email: string;
    fullName: string;
  };
}

export interface IRegistrationValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

export interface IRegistrationErrors extends IRegistrationValues {}

export interface ILoginValues
  extends Pick<IRegistrationValues, 'email' | 'password'> {}

export interface ILoginErrors
  extends Pick<IRegistrationErrors, 'email' | 'password'> {}

export interface IInputProps {
  value: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  error: string | undefined;
}
