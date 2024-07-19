import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import WeatherDisplay from '../../components/WeatherDisplay';

const mockStore = configureStore([]);

describe('WeatherDisplay', () => {
  it('renders weather data correctly', () => {
    const store = mockStore({
      weather: {
        data: {
          name: 'London',
          main: { temp: 15, humidity: 70 },
          weather: [{ description: 'Cloudy' }]
        },
        status: 'succeeded'
      }
    });

    render(
      <Provider store={store}>
        <WeatherDisplay />
      </Provider>
    );

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Temperature: 15°C')).toBeInTheDocument();
    expect(screen.getByText('Humidity: 70%')).toBeInTheDocument();
    expect(screen.getByText('Description: Cloudy')).toBeInTheDocument();
  });
});