import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const UserLogout = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await auth().signOut();
      navigation.navigate('UserLogin');
    } catch (error) {
      console.error('Error logging out:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
     
      {loading && <ActivityIndicator size="large" />}
      <TouchableOpacity style={styles.button} onPress={handleLogout} disabled={loading}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 999, 
  },
  button: {
    backgroundColor: 'darkblue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default UserLogout;
