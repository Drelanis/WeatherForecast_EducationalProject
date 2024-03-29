export interface IMainWeather {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
}

export interface IForecastWeather {
  dt_txt: string;
  dt: number;
  visibility: number;
  main: IMainWeather;
  wind: IWindDescription;
  weather: IWeatehrDescription[];
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

export interface IWindDescription {
  deg: number;
  gust: number;
  speed: number;
}

export interface ICurrentWeatherInfo {
  timezone: number;
  wind: IWindDescription;
  weather: IWeatehrDescription[];
  main: IMainWeather;
}

export interface ICurrentWeather {
  id: number;
  updatedAt: string;
  currentWeather: ICurrentWeatherInfo;
}

export interface ICity {
  id: number;
  name: string;
  country: string;
  weather: {
    id: number;
    currentWeather: ICurrentWeather;
  };
}

export interface IUserInformation {
  email: string;
  fullName: string;
}

export interface IUserProfile {
  getUser: IUserInformation;
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

export interface IDaysOfForecastWeather {
  [key: string]: IForecastWeather[];
}
