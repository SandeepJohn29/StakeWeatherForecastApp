import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ForecastModal from '../ForecastModel';
import { SavedCity } from '../../types';

const mockCity: SavedCity = {
  name: 'New York',
  forecast10Day: [
    {
      dt: 1710456000,
      main: {
        temp: 20,
        temp_min: 18,
        temp_max: 22,
        feels_like: 19,
        humidity: 65,
        pressure: 0,
      },
      weather: [
        { main: 'Clouds', description: 'scattered clouds', id: 0, icon: '' },
      ],
      wind: { speed: 5, deg: 1 },
      clouds: {
        all: 0,
      },
      visibility: 0,
      pop: 0,
      sys: {
        pod: '',
      },
      dt_txt: '',
    },
  ],
  forecast3Day: [],
  lastUpdated: 0,
};

describe('ForecastModal', () => {
  it('renders correctly when visible', () => {
    const { getByText } = render(
      <ForecastModal city={mockCity} visible={true} onClose={jest.fn()} />
    );

    expect(getByText('New York')).toBeTruthy();
    expect(getByText('10 Day Forecast')).toBeTruthy();
    expect(getByText('Clouds')).toBeTruthy();
  });

  it('calls onClose when the close button is pressed', () => {
    const onCloseMock = jest.fn();
    const { getByRole } = render(
      <ForecastModal city={mockCity} visible={true} onClose={onCloseMock} />
    );

    const closeButton = getByRole('button');
    fireEvent.press(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
