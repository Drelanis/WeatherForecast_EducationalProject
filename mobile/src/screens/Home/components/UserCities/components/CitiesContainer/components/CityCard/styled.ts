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

export const BottomWeatherElements = styled.View`
  flex-direction: row;
`;
