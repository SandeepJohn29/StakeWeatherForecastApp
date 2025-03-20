export interface WeatherData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  visibility: number;
}

export interface CityData {
  id: number;
  name: string;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface WeatherForecast {
  list: WeatherData[];
  city: CityData;
}

export interface SavedCity {
  name: string;
  forecast3Day: WeatherData[];
  forecast10Day: WeatherData[];
  lastUpdated: number;
}
