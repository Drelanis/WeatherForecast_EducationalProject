import { ICity } from 'lib/interfaces';
import React, { FC } from 'react';
import {
  CardBox,
  CardHeader,
  CityName,
  WeatherDescription,
  WeatherDescriptionColumn,
  WeatherDescriptionItem,
  WeatherIcon,
  WeatherName,
  WeatherSubHeader,
  WeatherText,
} from './styled';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import handleDataTime from 'lib/helpers/handleDataTime';
import useCurrentWeather from '../../hooks/useCurrentWeather';
import ScreenLoader from 'common/ScreenLoader';

interface ICityCardProps {
  cityId: number;
  cityName: string;
  city: ICity;
}

const CityCard: FC<ICityCardProps> = ({ city }) => {
  const { currentWeather, loading } = useCurrentWeather(city);
  const weather = currentWeather?.currentWeather;

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
        <WeatherIcon
          source={{
            uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`,
          }}
        />
        <WeatherSubHeader>
          <CityName>{city.name}</CityName>
          <WeatherName>{weather.weather[0].description}</WeatherName>
        </WeatherSubHeader>
      </CardHeader>
      <Divider />
      <WeatherDescription>
        <WeatherDescriptionColumn>
          <WeatherDescriptionItem>
            <Icon name="temperature-celsius" size={30} />
            <WeatherText>{`${weather.main.temp}°C (${weather.main.feels_like}°C)`}</WeatherText>
          </WeatherDescriptionItem>
          <WeatherDescriptionItem>
            <Icon name="water" size={30} />
            <WeatherText>{`${weather.main.humidity}%`}</WeatherText>
          </WeatherDescriptionItem>
        </WeatherDescriptionColumn>
        <WeatherDescriptionColumn>
          <WeatherDescriptionItem>
            <Icon name="wind-turbine" size={30} />
            <WeatherText>{`${weather.wind.speed} m/s`}</WeatherText>
          </WeatherDescriptionItem>
          <WeatherDescriptionItem>
            <Icon name="clock" size={30} />
            <WeatherText>{`${handleDataTime(
              currentWeather.updatedAt
            )}`}</WeatherText>
          </WeatherDescriptionItem>
        </WeatherDescriptionColumn>
      </WeatherDescription>
    </CardBox>
  );
};

export default CityCard;
