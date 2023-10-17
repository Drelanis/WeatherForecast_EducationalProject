import React, { FC } from 'react';
import useDeleteCity from '@hooks/useDeleteCity';
import { ICity, ICurrentWeather } from '@lib/intarfaces';
import useHandlePageRedirect from '@hooks/useHandlePageRedirect';
import WeatherIcon from './components/WeatherIcon';
import CityName from './components/CityName';
import WeatherDescription from './components/WeatherDescription';
import Temperature from './components/Temperature';
import Humidity from './components/Humidity';
import Wind from './components/Wind';
import UpdatedAt from './components/UpdatedAt';
import ControllButtons from './components/ControllButtons';
import LiveTimeClock from 'src/app/weather/common/LiveTimeClock';

interface IWeatherInfoProps {
  info: ICity;
  currentWeather: ICurrentWeather;
}

const WeatherInfo: FC<IWeatherInfoProps> = ({ info, currentWeather }) => {
  const { handlePageRedirect } = useHandlePageRedirect();
  const { handleDeleteCity } = useDeleteCity();
  const weatherInfo = currentWeather.currentWeather;
  return (
    <>
      <WeatherIcon weatherInfo={weatherInfo} />
      <CityName info={info} />
      <WeatherDescription
        mainDescription={weatherInfo.weather[0].main}
        extraDescription={weatherInfo.weather[0].description}
      />
      <Temperature
        temp={weatherInfo.main.temp}
        feelsLike={weatherInfo.main.feels_like}
      />
      <Humidity humidity={weatherInfo.main.humidity} />
      <Wind speed={weatherInfo.wind.speed} />
      <UpdatedAt updatedAt={currentWeather.updatedAt} />
      <LiveTimeClock offsetInSeconds={currentWeather.currentWeather.timezone} />
      <ControllButtons
        info={info}
        handlePageRedirect={handlePageRedirect}
        handleDeleteCity={handleDeleteCity}
      />
    </>
  );
};

export default WeatherInfo;
