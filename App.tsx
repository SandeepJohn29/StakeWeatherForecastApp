import { Provider } from 'react-redux';
import HomeScreen from './src/screens/HomeScreen';
import { store } from './src/store';
import { useEffect } from 'react';
import { loadSavedCities } from './src/store/weather/weatherSlice';
import React from 'react';
import { initializeAnalytics } from './src/utils/analytics';

export default function App() {
  useEffect(() => {
    store.dispatch(loadSavedCities());
    initializeAnalytics();
  }, []);

  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}
