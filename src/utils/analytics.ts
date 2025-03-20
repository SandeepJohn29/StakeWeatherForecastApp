import analytics from '@react-native-firebase/analytics';
import { Mixpanel } from 'mixpanel-react-native';
import { getApiKey } from '../config/apiKeys';

const trackAutomaticEvents = true;
const mixpanel = new Mixpanel(
  getApiKey('MIXPANEL_PROJECT_ID'),
  trackAutomaticEvents
);

export const initializeAnalytics = () => {
  mixpanel.init();
};

export const trackScreenView = (screenName: string) => {
  analytics().logScreenView({
    screen_name: screenName,
  });
};

export const trackEvent = (
  eventName: string,
  properties: Record<string, any> = {}
) => {
  try {
    analytics().logEvent(eventName, properties);
    mixpanel.track(eventName, properties);
  } catch (err) {
    console.error(err);
  }
};

export const AnalyticsEvents = {
  HomePage_Search_Button_Tapped: 'HomePage_Search_Button_Tapped',
  HomePage_Search_Success: 'HomePage_Search_Success',
  HomePage_CityItem_Tapped: 'HomePage_CityItem_Tapped',
  ForecastModal_Viewed: 'ForecastModal_Viewed',
  ForecastModal_Closed: 'ForecastModal_Closed',
  HomePage_CityItem_Deleted: 'HomePage_CityItem_Deleted',
  HomePage_CityList_Refreshed: 'HomePage_CityList_Refreshed',
  Dynamic_Popup_Viewed: 'Dynamic_Popup_Viewed',
  Dynamic_Popup_Closed: 'Dynamic_Popup_Closed',
};

export const AnalyticsErrorEvents = {
  HomePage_Search_Error: 'HomePage_Search_Error',
};
