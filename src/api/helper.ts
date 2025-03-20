import { CityData, WeatherForecast } from '../types';

export const mapWeatherAPIResponse = (data: any): WeatherForecast => {
  return {
    city: {
      id: data.location.name,
      name: data.location.name,
      country: data.location.country,
      population: 0,
      timezone: data.location.tz_id,
      sunrise: new Date(data.forecast.forecastday[0].astro.sunrise).getTime(),
      sunset: new Date(data.forecast.forecastday[0].astro.sunset).getTime(),
    } as CityData,

    list: data.forecast.forecastday.flatMap((day: any) => {
      const dayItem = day.day;
      return {
        dt: new Date(day.date).getTime() / 1000,
        main: {
          temp: dayItem.avgtemp_c,
          feels_like: dayItem.avgtemp_c,
          temp_min: dayItem.mintemp_c,
          temp_max: dayItem.maxtemp_c,
          pressure: dayItem.pressure_mb,
          humidity: dayItem.avghumidity,
        },
        weather: [
          {
            id: dayItem.condition.code,
            main: dayItem.condition.text,
            description: dayItem.condition.text,
            icon: dayItem.condition.icon,
          },
        ],
        wind: {
          speed: dayItem.maxwind_kph,
        },
      };
    }),
  };
};
