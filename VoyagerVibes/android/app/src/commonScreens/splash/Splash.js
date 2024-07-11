import React, { useEffect } from 'react';
import { View, ActivityIndicator, Image, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Splash = ({ navigation }) => {
  const checkUser = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userSnapshot = await firestore().collection('allUsers').doc(currentUser.uid).get();
        const userData = userSnapshot.data();
        userData.role === 'user'
          ? navigation.navigate('EnterUserHome')
          : userData.role === 'owner'
          ? navigation.navigate('EnterOwnerHome')
          : navigation.navigate('SelectionScreen');
      } else {
        navigation.navigate('SelectionScreen');
      }
      
    } catch (error) {
      console.error('Error checking user:', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkUser();
     
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://cdn1.vectorstock.com/i/1000x1000/52/55/food-delivery-service-perspective-landing-page-vector-36555255.jpg' }} style={styles.image} />
      <ActivityIndicator size="large" color="yellow" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100, 
    marginBottom: 20,
  },
});

export default Splash;
