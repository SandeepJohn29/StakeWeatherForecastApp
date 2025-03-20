import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AnalyticsEvents, trackEvent } from '../utils/analytics';

interface DynamicPopupProps {
  visible: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
}

const DynamicPopup: React.FC<DynamicPopupProps> = ({
  visible,
  message,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (visible) {
      trackEvent(AnalyticsEvents.Dynamic_Popup_Viewed, {
        message,
        duration,
      });
      const timer = setTimeout(() => {
        trackEvent(AnalyticsEvents.Dynamic_Popup_Closed, {
          message,
          duration,
        });
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        trackEvent(AnalyticsEvents.Dynamic_Popup_Closed, {
          message,
          duration,
        });
        onClose();
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.popupText}>{message}</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name='close-circle' size={30} color='#000' />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '85%',
  },
  popupText: {
    fontSize: 18,
    color: '#000',
  },
});

export default DynamicPopup;
