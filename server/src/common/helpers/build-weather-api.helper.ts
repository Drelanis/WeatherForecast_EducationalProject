export type WeatherType = 'weather' | 'forecast';

export const buildWeatherApi = (
  type: string,
  longitude: number,
  latitude: number,
) => {
  return `https://api.openweathermap.org/data/2.5/${type}?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.OPEN_WEATHER_KEY}`;
};
