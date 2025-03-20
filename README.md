# StakeWeatherForecastApp

## Overview
This is a **React Native** application that provides a **10-day weather forecast** for cities in the **UAE**. The app fetches weather data from **WeatherAPI** and displays detailed forecasts, including temperature, humidity, wind speed, and more.

## Features
- **Search for cities in UAE** and get weather forecasts.
- **10-day weather forecast** with hourly data.
- **Redux Toolkit** for state management.
- **Expo & React Native** for seamless cross-platform support.
- **Firebase Analytics** integration for tracking events.
- **Mixpanel Analytics** for event tracking.
- **Persistent storage** using AsyncStorage to save favorite cities.

## Tech Stack
- **React Native (Expo)**
- **TypeScript**
- **Redux Toolkit** for state management
- **Axios** for API requests
- **WeatherAPI** for weather data
- **Firebase Analytics** for event tracking
- **Mixpanel Analytics** for event tracking
- **Jest for unit testng

## Installation

1. Clone the repository:
   ```sh
   cd StakeWeatherForecastApp
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Add your API keys:
   - Create a `.env` file in the root directory and add:
     ```sh
     WEATHER_API_KEY=your_weather_api_key
     ```
   - Update `config/apiKeys.ts` to fetch the API key.

4. Start the development server (for expo go):
   ```sh
   npx expo start
   ```
   For running on emulator please run
   ```sh
   npx expo prebuild
   ```
   before
   ```sh
   npx expo run:android
   ```

## Usage
- **Search** for a city in the UAE.
- View **10-day forecast** with detailed hourly breakdown.
- Tap a city to view its **weather details**.
- **Remove saved cities** from the list.

## API Integration
- **WeatherAPI** is used for fetching weather data.
- The response is mapped to match the app's data structure.
- The API call is limited to **UAE cities only**.

## Folder Structure
```
📂 src
 ┣ 📂 api          # API services
 ┣ 📂 components   # Reusable UI components
 ┣ 📂 screens      # App screens
 ┣ 📂 store        # Redux slices & store setup
 ┗ 📂 utils        # Helper functions
```

## Contributing
1. Fork the repository.
2. Create a new branch (`feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to your branch (`git push origin feature/new-feature`).
5. Open a **Pull Request**.
