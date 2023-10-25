import { differenceInHours } from 'date-fns';

const shouldWeatherUpdate = (updatedAt: Date) => {
  const currentDate = new Date();
  const allowedTimeDifference = Number(process.env.OPEN_WEATHER_UPDATED_TIME);
  const timeDifferenceInHours = differenceInHours(currentDate, updatedAt);
  return timeDifferenceInHours >= allowedTimeDifference;
};

export default shouldWeatherUpdate;
