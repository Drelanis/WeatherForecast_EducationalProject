import { IForecastWeather } from '@lib/intarfaces';
import { Box } from '@mui/material';
import React, { FC } from 'react';
import styles from './index.module.scss';
import WeatherIcon from 'src/app/weather/common/WeatherIcon/WeatherIcon';
import WeatherDescription from 'src/app/weather/common/WeatherDescription';
import Temperature from 'src/app/weather/common/Temperature';
import Humidity from 'src/app/weather/common/Humidity';
import Wind from 'src/app/weather/common/Wind/Wind';
import Time from 'src/app/weather/common/Time';

interface IForecastWeatherCardProps {
  data: IForecastWeather;
}

const ForecastWeatherCard: FC<IForecastWeatherCardProps> = ({ data }) => {
  console.log(data);
  return (
    <Box className={styles.card}>
      <WeatherIcon weatherInfo={data.weather} />
      <WeatherDescription
        mainDescription={data.weather[0].main}
        extraDescription={data.weather[0].description}
      />
      <Temperature temp={data.main.temp} feelsLike={data.main.feels_like} />
      <Humidity humidity={data.main.humidity} />
      <Wind speed={data.wind.speed} />
      <Time time={data.dt_txt} />
    </Box>
  );
};

export default ForecastWeatherCard;
