import styled from 'styled-components/native';

export const CardBox = styled.View`
  margin-top: 10px;
  border-radius: 20px;
  width: auto;
  height: 200px;
  background-color: rgba(99, 99, 255, 0.5);
  border: 3px solid rgba(0, 0, 0, 0.7);
`;

export const CardHeader = styled.View`
  flex-direction: row;
`;

export const WeatherIcon = styled.Image`
  height: 75px;
  width: 75px;
`;

export const WeatherSubHeader = styled.View`
  margin: auto;
`;

export const CityName = styled.Text`
  margin: auto;
  font-weight: 700;
  font-size: large;
`;

export const WeatherName = styled.Text`
  margin: auto;
  font-size: medium;
`;

export const WeatherDescription = styled.View`
  flex-direction: row;
`;

export const WeatherDescriptionColumn = styled.View`
  margin: auto;
  flex-direction: column;
`;

export const WeatherDescriptionItem = styled.View`
  flex-direction: row;
`;

export const WeatherText = styled.Text`
  line-height: 30px;
`;
