export const API_KEYS = {
  OPENWEATHERMAP: process.env.EXPO_PUBLIC_OPENWEATHERMAP_API_KEY,
  GOOGLE_ANALYTICS: process.env.EXPO_PUBLIC_GOOGLE_ANALYTICS_KEY,
  MIXPANEL_PROJECT_ID: process.env.EXPO_PUBLIC_MIXPANEL_PROJECT_ID,
  WEATHER_API: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
};

export type ApiKeyName = keyof typeof API_KEYS;

export const getApiKey = (keyName: ApiKeyName): string => {
  const key = API_KEYS[keyName];
  if (!key) {
    console.warn(`API key for ${keyName} is not defined`);
  }
  return key || '';
};
