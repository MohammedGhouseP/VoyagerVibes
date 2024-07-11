import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ buttonText, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default CustomButton;
