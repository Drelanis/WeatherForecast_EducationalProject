import React from 'react';

const CityCard = ({ info }: any) => {
  return (
    <div className="city-card">
      <span>name - {info.name}</span>
      <span>country - {info.country}</span>
      {/*<span>tempature - {info.weather.temp}</span>
      <span>feels like - {info.weather.feelsLike}</span>
      <span>visbility - {info.weather.visbility}</span>
      <span>speedWind - {info.weather.speedWind}</span> */}
    </div>
  );
};

export default CityCard;
