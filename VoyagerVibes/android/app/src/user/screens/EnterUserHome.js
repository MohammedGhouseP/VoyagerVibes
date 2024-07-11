import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EnterUserHome = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('UserHome'); 
  };

  return (
    <ImageBackground source={{ uri: 'https://png.pngtree.com/png-vector/20190215/ourmid/pngtree-elegant-valentine-background-png-image_485492.jpg' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.text}>Enter User Home?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'pink', 
    textAlign: 'center',
    fontSize: 24, 
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default EnterUserHome;
