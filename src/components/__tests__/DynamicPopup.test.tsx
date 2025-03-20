import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DynamicPopup from '../DynamicPopup';

describe('DynamicPopup Component', () => {
  test('renders correctly when visible', () => {
    const { getByText } = render(
      <DynamicPopup visible={true} message='Test Message' onClose={jest.fn()} />
    );
    expect(getByText('Test Message')).toBeTruthy();
  });

  test('calls onClose when close button is pressed', () => {
    const mockOnClose = jest.fn();
    const { getByRole } = render(
      <DynamicPopup
        visible={true}
        message='Test Message'
        onClose={mockOnClose}
      />
    );

    fireEvent.press(getByRole('button'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('automatically closes after duration', async () => {
    jest.useFakeTimers();
    const mockOnClose = jest.fn();
    render(
      <DynamicPopup
        visible={true}
        message='Test Message'
        onClose={mockOnClose}
        duration={3000}
      />
    );

    jest.advanceTimersByTime(3000);
    await waitFor(() => expect(mockOnClose).toHaveBeenCalled());
  });
});
