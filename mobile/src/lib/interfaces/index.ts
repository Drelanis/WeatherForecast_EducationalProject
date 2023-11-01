import { Dispatch, SetStateAction } from 'react';

export interface ILoginValues {
  email: string;
  password: string;
}

export interface ILoginErrors {
  email?: string;
  password?: string;
}

export interface IAuth {
  isAuth: boolean;
  userId: string;
}

export interface IAuthContext {
  auth: IAuth | null;
  setAuth: Dispatch<SetStateAction<IAuth | null>>;
}

export interface ILoadingContext {
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
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

export interface IMainWeather {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
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
