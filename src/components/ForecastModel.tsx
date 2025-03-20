import React, { useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SavedCity } from '../types';
import { format } from 'date-fns';
import WeatherIcon from './WeatherIcon';
import { AnalyticsEvents, trackEvent } from '../utils/analytics';

interface ForecastModalProps {
  city: SavedCity | null;
  visible: boolean;
  onClose: () => void;
}

const ForecastModal: React.FC<ForecastModalProps> = ({
  city,
  visible,
  onClose,
}) => {
  useEffect(() => {
    if (visible) {
      trackEvent(AnalyticsEvents.ForecastModal_Viewed, {
        city,
      });
    }
  }, [visible]);

  if (!city) return null;

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>{city?.name}</Text>
              <Text style={styles.modalSubtitle}>{'10 Day Forecast'}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name='close' size={24} color='#333' />
            </TouchableOpacity>
          </View>

          <FlatList
            data={city?.forecast10Day}
            keyExtractor={(_, index) => `forecast-${index}`}
            renderItem={({ item }) => {
              const date = new Date(item?.dt * 1000);
              const tempC = Math.round(item?.main?.temp);
              const tempMin = Math.round(item?.main?.temp_min);
              const tempMax = Math.round(item?.main?.temp_max);
              const feelsLike = Math.round(item?.main?.feels_like);

              return (
                <View style={styles.forecastItem}>
                  <View style={styles.forecastDay}>
                    <Text style={styles.dayName}>{format(date, 'EEE')}</Text>
                    <Text style={styles.date}>{format(date, 'MMM d')}</Text>
                  </View>

                  <View style={styles.forecastDetails}>
                    <WeatherIcon
                      condition={item?.weather?.[0]?.main}
                      size={36}
                    />
                    <View style={styles.tempContainer}>
                      <Text style={styles.temp}>{`${tempC}°C`}</Text>
                      <Text style={styles.tempRange}>
                        {`${tempMin}° / ${tempMax}°`}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.weatherInfo}>
                    <Text style={styles.weatherDescription}>
                      {item?.weather?.[0]?.description}
                    </Text>
                    <Text style={styles.weatherSubInfo}>
                      {`Feels like ${feelsLike}°C • Humidity ${item?.main?.humidity}%`}
                    </Text>
                    <Text style={styles.weatherSubInfo}>
                      {` Wind ${Math.round(item.wind.speed)} km/h`}
                    </Text>
                  </View>
                </View>
              );
            }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#f8fafc',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 16,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  closeButton: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 2,
  },
  forecastItem: {
    paddingVertical: 16,
  },
  forecastDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tempContainer: {
    marginLeft: 16,
  },
  forecastDay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  weatherInfo: {
    marginTop: 8,
  },
  dayName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 6,
    color: '#334155',
  },
  date: {
    fontSize: 14,
    color: '#64748b',
  },
  temp: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  tempRange: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  weatherDescription: {
    fontSize: 15,
    textTransform: 'capitalize',
    marginBottom: 4,
    color: '#334155',
  },
  weatherSubInfo: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 4,
  },
});

export default ForecastModal;
