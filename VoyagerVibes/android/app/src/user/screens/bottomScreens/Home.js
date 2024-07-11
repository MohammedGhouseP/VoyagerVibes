import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';


const StopCard = ({ title, image }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );
};

const Home = ({navigation}) => {
  const [locationName, setLocationName] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const requestLocationPermission = () => {
      Geolocation.requestAuthorization(
        () => {
          Geolocation.getCurrentPosition(
            async position => {
              const { latitude, longitude } = position.coords;
              setLatitude(latitude);
              setLongitude(longitude);
              await getLocationName(latitude, longitude);
              await fetchMarkers(latitude, longitude);
            },
            error => {
              console.error('Error getting current location:', error);
            },
          );
        },
        error => {
          console.error('Error requesting location permission:', error);
        },
      );
    };

    const getLocationName = async (latitude, longitude) => {
      try {
        const apiKey = '4a92e86c6073444a93c20b73f2f58285';
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        if (data.results.length > 0) {
          const address = data.results[0].formatted;
          setLocationName(address);
        } else {
          console.warn('Location not found');
        }
      } catch (error) {
        console.error('Error fetching location name:', error.message);
      }
    };

    const fetchMarkers = async (latitude, longitude) => {
      const apiKey = 'AIzaSyAp__xlkv0-fU0iXT_SCReglaAzQQu2R04';

      try {
        const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000000&type=restaurant&key=${apiKey}&limit=50`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.results) {
          const newMarkers = data.results.map(result => ({
            id: result.place_id,
            title: result.name,
            image: result.photos && result.photos.length > 0 ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=${apiKey}` : null,
            coordinates: {
              latitude: result.geometry.location.lat,
              longitude: result.geometry.location.lng,
            },
          }));
          setMarkers(newMarkers);
        }
      } catch (error) {
        console.error('Error fetching markers:', error);
      }
    };

    requestLocationPermission();
  }, []);

  const handleOrderFoodPress = () => {
   navigation.navigate("FoodItems")
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          source={{ uri: 'https://img.freepik.com/free-vector/location_53876-25530.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705708800&semt=ais' }}
          style={styles.icon}
        />
        <TextInput
          label="Location"
          value={locationName}
          editable={false}
          style={styles.input}
          placeholder="Enter location"
        />
      </View>
      <View style={styles.mapContainer}>
        {latitude !== 0 && longitude !== 0 ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: Number(latitude),
              longitude: Number(longitude),
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {/* Marker for the current location */}
            <Marker
              coordinate={{
                latitude: Number(latitude),
                longitude: Number(longitude),
              }}
              title="Current Location"
              pinColor="blue"
            />

            {/* Other markers */}
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.coordinates}
                title={marker.title}
              />
            ))}
          </MapView>
        ) : (
          <Text>No valid location data</Text>
        )}
      </View>
      <View style={styles.nearbyStopsContainer}>
        <Text style={styles.title}>Nearby Restaurants</Text>
        <TouchableOpacity onPress={handleOrderFoodPress} style={styles.orderFoodButton}>
          <Text style={styles.orderFoodText}>Order Food</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.cardContainer}>
        {markers.map((marker, index) => (
          <StopCard key={index} title={marker.title} image={marker.image} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'black',
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
    marginTop: 10,
  },
  map: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    marginTop: 10,
  },
  card: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardTitle: {
    textAlign: 'center',
    paddingVertical: 10,
    fontWeight: 'bold',
    color: 'black'
  },
  nearbyStopsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderFoodButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop:10
  },
  orderFoodText: {
    color: 'white',
    fontWeight: 'bold',
    
  },
});

export default Home;
