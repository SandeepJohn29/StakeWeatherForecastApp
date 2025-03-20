import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import weatherReducer, {
  fetchWeatherForecast,
} from '../../store/weather/weatherSlice';
import SearchBar from '../../components/SearchBar';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

describe('SearchBar component', () => {
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Search for a city...')).toBeTruthy();
  });

  it('handles search input and dispatches fetchWeatherForecast', async () => {
    const dispatchMock = jest.fn();
    store.dispatch = dispatchMock;

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    fireEvent.changeText(
      screen.getByPlaceholderText('Search for a city...'),
      'London'
    );

    fireEvent.press(screen.getByRole('button'));

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(fetchWeatherForecast('London'));
    });
  });

  it('shows a loading spinner when loading is true', () => {
    const storeWithLoading = configureStore({
      reducer: {
        weather: weatherReducer,
      },
      preloadedState: {
        weather: {
          loading: true,
          error: null,
          cities: [],
        },
      },
    });

    render(
      <Provider store={storeWithLoading}>
        <SearchBar />
      </Provider>
    );

    expect(screen.getByTestId('loading-spinner')).toBeTruthy();
  });

  it('shows a popup when there is an error', async () => {
    const storeWithError = configureStore({
      reducer: {
        weather: weatherReducer,
      },
      preloadedState: {
        weather: {
          loading: false,
          error: 'City not found',
          cities: [],
        },
      },
    });

    render(
      <Provider store={storeWithError}>
        <SearchBar />
      </Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByText('The city was not found in OpenWeather AE')
      ).toBeTruthy();
    });
  });
});
