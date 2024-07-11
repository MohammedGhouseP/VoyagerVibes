import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const profileRef = await firestore().collection('profiles').doc('profile_id').get();
      const data = profileRef.data();
      setProfileData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://png.pngtree.com/png-vector/20190215/ourmid/pngtree-elegant-valentine-background-png-image_485492.jpg' }}
        style={styles.backgroundImage}>
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : profileData ? (
          <View style={styles.profileContainer}>
            <Text style={styles.profileText}>Name: {profileData.name}</Text>
           
            <Text style={styles.profileText}>Email: {profileData.email}</Text>
          
          </View>
        ) : (
          <Text style={styles.errorText}>Error fetching profile data.</Text>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
  profileText: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: '#ffffff',
  },
});

export default Profile;
