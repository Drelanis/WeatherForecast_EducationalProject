import React, { FC } from 'react';
import useDeleteCity from 'src/app/weather/components/CityCard/components/UserCities/components/Card/components/WeatherInfo/hooks/useDeleteCity';
import { ICity } from '@lib/intarfaces';
import useHandlePageRedirect from '@hooks/useHandlePageRedirect';
import WeatherIcon from './components/WeatherIcon/WeatherIcon';
import CityName from './components/CityName';
import WeatherDescription from './components/WeatherDescription';
import Temperature from './components/Temperature';
import Humidity from './components/Humidity';
import Wind from './components/Wind/Wind';
import UpdatedAt from './components/UpdatedAt';
import ControllButtons from './components/ControllButtons';
import LiveTimeClock from 'src/app/weather/common/LiveTimeClock';
import useCurrentWeather from 'src/app/weather/components/CityCard/components/UserCities/components/Card/components/WeatherInfo/hooks/useCurrentWeather';
import { CircularProgress } from '@mui/material';

interface IWeatherInfoProps {
  data: ICity;
}

const WeatherInfo: FC<IWeatherInfoProps> = ({ data }) => {
  const { currentWeather, loading } = useCurrentWeather(data);
  const { handlePageRedirect } = useHandlePageRedirect();
  const { handleDeleteCity } = useDeleteCity();
  const weatherInfo = currentWeather?.currentWeather;

  if (loading) {
    return <CircularProgress sx={{ margin: 'auto' }} />;
  }

  return (
    <>
      <WeatherIcon weatherInfo={weatherInfo} />
      <CityName info={data} />
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
        info={data}
        handlePageRedirect={handlePageRedirect}
        handleDeleteCity={handleDeleteCity}
      />
    </>
  );
};

export default WeatherInfo;
