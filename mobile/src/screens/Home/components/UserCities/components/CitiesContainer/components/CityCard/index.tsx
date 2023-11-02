import { ICity, ICurrentWeatherInfo } from 'lib/interfaces';
import React, { FC } from 'react';
import {
  BottomWeatherElements,
  CardBox,
  CardHeader,
  WeatherDescription,
  WeatherDescriptionColumn,
} from './styled';
import { Divider } from 'react-native-paper';
import useCurrentWeather from './hooks/useCurrentWeather';
import ScreenLoader from 'common/ScreenLoader';
import LiveTimeClock from './components/LiveTimeClock';
import CardIcon from './components/Icon';
import SubHeader from './components/SubHeader';
import Temperature from './components/Temperature';
import Humidity from './components/Humidity';
import Wind from './components/Wind';
import UpdatedAt from './components/UpdatedAt';
import DeleteButton from './components/DeleteButton';

interface ICityCardProps {
  cityId: number;
  cityName: string;
  city: ICity;
}

const CityCard: FC<ICityCardProps> = ({ city }) => {
  const { currentWeather, loading } = useCurrentWeather(city);
  const weather: ICurrentWeatherInfo = currentWeather?.currentWeather;

  if (loading) {
    return (
      <CardBox>
        <ScreenLoader />
      </CardBox>
    );
  }

  return (
    <CardBox>
      <CardHeader>
        <CardIcon icon={weather.weather[0].icon} />
        <SubHeader
          cityName={city.name}
          weatherDescription={weather.weather[0].description}
        />
      </CardHeader>
      <Divider />
      <WeatherDescription>
        <WeatherDescriptionColumn>
          <Temperature
            temp={weather.main.temp}
            feelsLike={weather.main.feels_like}
          />
          <Humidity humidity={weather.main.humidity} />
        </WeatherDescriptionColumn>
        <WeatherDescriptionColumn>
          <Wind speed={weather.wind.speed} />
          <UpdatedAt updatedAt={currentWeather.updatedAt} />
        </WeatherDescriptionColumn>
      </WeatherDescription>
      <BottomWeatherElements>
        <WeatherDescriptionColumn>
          <LiveTimeClock offsetInSeconds={weather.timezone} />
        </WeatherDescriptionColumn>
        <WeatherDescriptionColumn>
          <DeleteButton cityId={city.id} />
        </WeatherDescriptionColumn>
      </BottomWeatherElements>
    </CardBox>
  );
};

export default CityCard;
