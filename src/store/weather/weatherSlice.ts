import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { SavedCity } from '../../types';
import { getWeatherForecast } from '../../api/weatherService';
import { getData, storeData } from '../../utils/storage';
import { AnalyticsEvents, trackEvent } from '../../utils/analytics';

interface WeatherState {
  cities: SavedCity[];
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  cities: [],
  loading: false,
  error: null,
};

export const fetchWeatherForecast = createAsyncThunk(
  'weather/fetchForecast',
  async (city: string) => {
    const response = await getWeatherForecast(city);
    return response;
  }
);

export const loadSavedCities = createAsyncThunk(
  'weather/loadSavedCities',
  async () => {
    const savedCities = await getData('savedCities');
    return savedCities || [];
  }
);

export const refreshCityForecasts = createAsyncThunk(
  'weather/refreshCityForecasts',
  async (_, { getState, dispatch }) => {
    const state = getState() as { weather: WeatherState };
    const cities = state?.weather?.cities;

    const refreshPromises = cities.map((city) =>
      dispatch(fetchWeatherForecast(city?.name))
    );

    await Promise.all(refreshPromises);

    return true;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    removeCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter(
        (city) => city.name !== action.payload
      );
      storeData('savedCities', state.cities);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherForecast.fulfilled, (state, action) => {
        state.loading = false;

        const forecastData = action.payload?.list;
        const cityName = action.payload?.city?.name;

        const forecast3Day = forecastData.slice(0, 3);

        const forecast10Day = forecastData.slice(0, 10);

        const existingCityIndex = state.cities.findIndex(
          (city) => city.name === cityName
        );

        trackEvent(AnalyticsEvents.HomePage_Search_Success, {
          city: action?.payload?.city,
        });

        if (existingCityIndex !== -1) {
          state.cities[existingCityIndex] = {
            name: cityName,
            forecast3Day,
            forecast10Day,
            lastUpdated: Date.now(),
          };
        } else {
          state.cities.push({
            name: cityName,
            forecast3Day,
            forecast10Day,
            lastUpdated: Date.now(),
          });
        }
        storeData('savedCities', state.cities);
      })
      .addCase(fetchWeatherForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      })
      .addCase(loadSavedCities.fulfilled, (state, action) => {
        state.cities = action.payload;
      })
      .addCase(refreshCityForecasts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshCityForecasts.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(refreshCityForecasts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to refresh weather data';
      });
  },
});

export const { removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
