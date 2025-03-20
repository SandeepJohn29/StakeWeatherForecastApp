import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { removeCity } from '../store/weather/weatherSlice';
import { SavedCity } from '../types';
import { format } from 'date-fns';
import WeatherIcon from './WeatherIcon';
import { useAppDispatch } from '../store';
import { AnalyticsEvents, trackEvent } from '../utils/analytics';

interface CityListItemProps {
  city: SavedCity;
  onPress: () => void;
}

const CityListItem: React.FC<CityListItemProps> = ({ city, onPress }) => {
  const dispatch = useAppDispatch();

  const handleRemove = (e: any) => {
    trackEvent(AnalyticsEvents.HomePage_CityItem_Deleted, {
      city,
    });
    e.stopPropagation();
    dispatch(removeCity(city?.name));
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.cityInfo}>
          <Text style={styles.cityName}>{city?.name}</Text>
          <Text style={styles.lastUpdated}>
            {`Updated ${format(new Date(city?.lastUpdated), 'MMM d, h:mm a')}`}
          </Text>
        </View>
        <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
          <Ionicons name='close' size={20} color='#ff6b6b' />
        </TouchableOpacity>
      </View>

      <View style={styles.forecastContainer}>
        {city?.forecast3Day?.map((forecast, index) => {
          const date = new Date(forecast?.dt * 1000);
          return (
            <View key={index} style={styles.dayForecast}>
              <Text style={styles.day}>
                {index === 0 ? 'Today' : format(date, 'EEE')}
              </Text>
              <WeatherIcon condition={forecast?.weather?.[0]?.main} size={32} />
              <Text style={styles.temp}>
                {` ${Math.round(forecast?.main?.temp)}°C`}
              </Text>
              <Text style={styles.description}>
                {forecast?.weather?.[0]?.main}
              </Text>
            </View>
          );
        })}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    margin: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cityName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1e293b',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#64748b',
  },
  forecastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  day: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#334155',
  },
  cityInfo: {
    flex: 1,
  },
  removeButton: {
    padding: 4,
  },
  dayForecast: {
    alignItems: 'center',
    flex: 1,
  },
  temp: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#0f172a',
  },
  description: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
});

export default CityListItem;
