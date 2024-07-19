import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import App from '../../App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('https://api.openweathermap.org/data/2.5/weather', (req, res, ctx) => {
    return res(ctx.json({
      name: 'London',
      main: { temp: 15, humidity: 70 },
      weather: [{ description: 'Cloudy' }]
    }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('fetches and displays weather', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  fireEvent.change(screen.getByPlaceholderText('Enter city name'), { target: { value: 'London' } });
  fireEvent.click(screen.getByText('Search'));

  await waitFor(() => {
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Temperature: 15°C')).toBeInTheDocument();
    expect(screen.getByText('Humidity: 70%')).toBeInTheDocument();
    expect(screen.getByText('Description: Cloudy')).toBeInTheDocument();
  });
});