import { daysOfWeek } from '@lib/consts/daysOfWeek';
import { IDaysOfForecastWeather, IForecastWeather } from '@lib/intarfaces';

const getDays = (forecastList: IForecastWeather[] = []) => {
  const daysOfForecastWeather: IDaysOfForecastWeather = {};
  let prevDay = '';
  forecastList.forEach((forecast) => {
    const date = new Date(forecast.dt_txt);
    const dayOfWeek = date.getDay();
    const nameOfTheDay = daysOfWeek[dayOfWeek];
    if (nameOfTheDay === prevDay) {
      daysOfForecastWeather[nameOfTheDay].push({ ...forecast });
      return;
    }
    prevDay = nameOfTheDay;
    daysOfForecastWeather[nameOfTheDay] = [];
  });
  const firstDayOfWeek = Object.keys(daysOfForecastWeather)[0];
  const renamedDaysOfForecast: {
    [key: string]: IForecastWeather[];
  } = {
    Today: daysOfForecastWeather[firstDayOfWeek],
    ...daysOfForecastWeather,
  };
  const { [firstDayOfWeek]: deletedDay, ...resultObject } =
    renamedDaysOfForecast;
  return resultObject || [];
};

export default getDays;
