import { ICurrentWeather } from './current-weather.interface';
import { IForecastWeather } from './forecast-weather.interface';

export interface IWeather {
  id: number;
  cityId: number;
  currentWeather: ICurrentWeather;
  forecastWeather: IForecastWeather;
}
