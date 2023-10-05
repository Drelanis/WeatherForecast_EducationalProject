export interface IWeather {}
export interface ICity {
  id: number;
  name: string;
  country: string;
  weather: {
    currentWeather: {
      currentWeather: {
        main: {
          temp: string;
          feels_like: string;
          pressure: string;
          humidity: string;
        };
      };
    };
  };
}
