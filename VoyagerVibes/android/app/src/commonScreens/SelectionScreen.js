import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const SelectionScreen = ({ navigation }) => {
  const handleUserPress = () => {
    navigation.navigate('UserLogin');
  };

  const handleOwnerPress = () => {
    navigation.navigate('OwnerLogin');
  };

  return (
    <ImageBackground source={{uri: 'https://img.freepik.com/free-photo/colorful-background-with-alcohol-ink_24972-1282.jpg'}} style={styles.backgroundImage}>
      <Text style={styles.welcomeText}>Welcome To voyogarVibes</Text>
      <View style={styles.container}>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'pink' }]} onPress={handleUserPress}>
          <Text style={[styles.buttonText, { color: 'blue' }]}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'pink' }]} onPress={handleOwnerPress}>
          <Text style={[styles.buttonText, { color: 'blue' }]}>Owner</Text>
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 50,
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'pink',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'pink',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});

export default SelectionScreen;
