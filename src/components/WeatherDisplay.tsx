import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const WeatherDisplay: React.FC = () => {
  const weather = useSelector((state: RootState) => state.weather);

  if (weather.status === 'loading') return <div>Loading...</div>;
  if (weather.status === 'failed') return <div>Error: {weather.error}</div>;
  if (!weather.data) return null;

  return (
    <div>
      <h2>{weather.data.name}</h2>
      <p>Temperature: {weather.data.main.temp}°C</p>
      <p>Humidity: {weather.data.main.humidity}%</p>
      <p>Description: {weather.data.weather[0].description}</p>
    </div>
  );
};

export default WeatherDisplay;