import React from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import SearchBar from '../components/SearchBar';
import CityList from '../components/CityList';

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle='dark-content' backgroundColor='#ffffff' />
      <View style={styles.container}>
        <SearchBar />
        <CityList />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
});

export default HomeScreen;
