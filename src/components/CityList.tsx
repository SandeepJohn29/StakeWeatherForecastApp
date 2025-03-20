import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import {
  loadSavedCities,
  refreshCityForecasts,
} from '../store/weather/weatherSlice';
import CityListItem from './CityListItem';
import { SavedCity } from '../types';
import ForecastModal from './ForecastModel';
import { Ionicons } from '@expo/vector-icons';
import { AnalyticsEvents, trackEvent } from '../utils/analytics';

const CityList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cities, loading } = useSelector((state: RootState) => state.weather);
  const [selectedCity, setSelectedCity] = useState<SavedCity | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    trackEvent(AnalyticsEvents.HomePage_CityList_Refreshed);
    setRefreshing(true);
    dispatch(refreshCityForecasts()).finally(() => setRefreshing(false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadSavedCities());
    onRefresh();
  }, [dispatch]);

  const handleCityPress = (city: SavedCity) => {
    trackEvent(AnalyticsEvents.HomePage_CityItem_Tapped, {
      city,
    });
    setSelectedCity(city);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    trackEvent(AnalyticsEvents.ForecastModal_Closed);
    setModalVisible(false);
  };

  if (loading && cities.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#4A90E2' />
        <Text style={styles.loadingText}>{'Loading cities...'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cities?.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name='cloud-outline' size={60} color='#ccc' />
          <Text style={styles.emptyText}>
            {
              'No cities added yet. Search for a city above to add its weather information.'
            }
          </Text>
        </View>
      ) : (
        <FlatList
          data={cities}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <CityListItem city={item} onPress={() => handleCityPress(item)} />
          )}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#4A90E2']}
              tintColor='#4A90E2'
            />
          }
        />
      )}

      <ForecastModal
        city={selectedCity}
        visible={modalVisible}
        onClose={handleCloseModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
    lineHeight: 22,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
});
export default CityList;
