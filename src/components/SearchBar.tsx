import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { fetchWeatherForecast } from '../store/weather/weatherSlice';
import { RootState, useAppDispatch } from '../store';
import DynamicPopup from './DynamicPopup';
import {
  AnalyticsErrorEvents,
  AnalyticsEvents,
  trackEvent,
} from '../utils/analytics';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.weather);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>('');

  const showPopup = (message: string, duration: number = 3000) => {
    setPopupMessage(message);
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
    }, duration);
  };

  const handleSearch = () => {
    if (query.trim()) {
      trackEvent(AnalyticsEvents.HomePage_Search_Button_Tapped, {
        searchText: query.trim(),
      });
      dispatch(fetchWeatherForecast(query.trim()));
      setQuery('');
    }
  };

  useEffect(() => {
    if (error) {
      trackEvent(AnalyticsErrorEvents.HomePage_Search_Error, {
        apiErrorMsg: error,
      });
      showPopup('Please search for a valid UAE city ');
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name='search'
          size={20}
          color='#666'
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={'Search for a city...'}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType='search'
          placeholderTextColor='#999'
        />
        {query?.length > 0 && (
          <TouchableOpacity
            onPress={() => setQuery('')}
            style={styles.clearButton}
          >
            <Ionicons name='close-circle' size={18} color='#999' />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleSearch}
        disabled={loading || query.trim().length === 0}
      >
        {loading ? (
          <ActivityIndicator color='#fff' size='small' />
        ) : (
          <Ionicons name='arrow-forward' size={22} color='#fff' />
        )}
      </TouchableOpacity>
      <DynamicPopup
        visible={popupVisible}
        message={popupMessage}
        onClose={() => setPopupVisible(false)}
        duration={3000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f1f5f9',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchIcon: {
    marginRight: 8,
    color: '#64748b',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#334155',
  },
  clearButton: {
    padding: 4,
  },
  searchButton: {
    marginLeft: 12,
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;
