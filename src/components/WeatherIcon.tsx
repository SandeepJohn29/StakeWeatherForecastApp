import React from 'react';
import { View } from 'react-native';
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

interface WeatherIconProps {
  condition: string;
  size: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, size }) => {
  const getIcon = () => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Ionicons name='sunny' size={size} color='#f59e0b' />;
      case 'clouds':
      case 'cloudy':
        return <Ionicons name='cloudy' size={size} color='#64748b' />;
      case 'rain':
      case 'drizzle':
        return <Ionicons name='rainy' size={size} color='#0ea5e9' />;
      case 'thunderstorm':
        return <Ionicons name='thunderstorm' size={size} color='#7c3aed' />;
      case 'snow':
        return <Ionicons name='snow' size={size} color='#e2e8f0' />;
      case 'mist':
      case 'fog':
      case 'haze':
        return (
          <MaterialCommunityIcons
            name='weather-fog'
            size={size}
            color='#94a3b8'
          />
        );
      case 'dust':
      case 'sand':
        return <FontAwesome5 name='wind' size={size} color='#d97706' />;
      default:
        return <Ionicons name='partly-sunny' size={size} color='#f59e0b' />;
    }
  };

  return <View>{getIcon()}</View>;
};

export default WeatherIcon;
