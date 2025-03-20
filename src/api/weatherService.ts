import { BaseApi } from './baseApi';
import { getApiKey } from '../config/apiKeys';
import { WeatherForecast } from '../types';
import { BASE_API_URL, WEATHER_API_URL } from './apiUrl';
import { mapWeatherAPIResponse } from './helper';

class WeatherService extends BaseApi {
  private apiKey: string;

  constructor() {
    super(BASE_API_URL.WEATHER_API);
    this.apiKey = getApiKey('WEATHER_API');
  }

  async getWeatherForecast(city: string): Promise<WeatherForecast> {
    try {
      const response: any = await this.get(WEATHER_API_URL.FORECAST, {
        params: {
          key: this.apiKey,
          q: `${city},AE`,
          days: 10,
          aqi: 'no',
          alerts: 'no',
        },
      });

      if (response?.location?.country !== 'United Arab Emirates') {
        throw new Error(`City not found in UAE: ${city}`);
      }
      return mapWeatherAPIResponse(response);
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      throw error;
    }
  }
}

export const weatherService = new WeatherService();

export const getWeatherForecast = (city: string) =>
  weatherService.getWeatherForecast(city);
