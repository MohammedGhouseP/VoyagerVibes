import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; // Import auth module from Firebase
import { useNavigation } from '@react-navigation/native';

const SelectOwner = ({ route }) => {
  const { enteredLocation, items, totalPrice, numberOfItems } = route.params;
  const [owners, setOwners] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
 const navigation=useNavigation()
  useEffect(() => {
    // Fetch current user's information
    const fetchCurrentUser = async () => {
        try {
          const currentUser = auth().currentUser;
          if (currentUser) {
            const userSnapshot = await firestore()
              .collection('allUsers')
              .doc(currentUser.uid)
              .get();
      
            if (userSnapshot.exists) {
              const userData = userSnapshot.data();
              setCurrentUserName(userData.name);
              setCurrentUserId(currentUser.uid);
              console.log(userData.name)
              console.log(currentUser.uid)
            } else {
              console.error('User data not found in Firestore');
            }
          }
        } catch (error) {
          console.error('Error fetching current user:', error);
        }
      };
      fetchCurrentUser()

    // Fetch owners from Firestore
    const fetchOwners = async () => {
      try {
        const ownersSnapshot = await firestore()
          .collection('allUsers')
          .where('role', '==', 'owner')
          .get();
        const ownersData = ownersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
       
        setOwners(ownersData);
      } catch (error) {
        console.error('Error fetching owners:', error);
      }
    };

    fetchOwners();
  }, []);

  const handleOrder = (selectedOwner) => {
    if (selectedOwner) {
      console.log('Selected owner id:', selectedOwner.id);
      console.log('Selected owner name:', selectedOwner.name);
  
      Alert.alert('Order Confirmation', 'Do you want to order food?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => initiatePayment(selectedOwner),
        },
      ]);
    } else {
      Alert.alert('Error', 'Please select an owner to proceed.');
    }
  };
  

  const initiatePayment = async (owner) => {
    const options = {
      description: 'Payment for food order',
    //   image: 'rzp_test_P9GGaAXRTQMmea',
    //   currency: 'INR',
      key: 'rzp_test_P9GGaAXRTQMmea',
      amount: (totalPrice * 100).toFixed(0),
    //   name: 'items.name',
  
      theme: { color: '#528FF0' },
    };
  
    RazorpayCheckout.open(options)
      .then(async data => {
        // Handle success
        console.log('Payment success:', data);
  
        // Save order data to Firestore
        try {
          await firestore().collection('orders').add({
            enteredLocation,
            items,
            totalPrice,
            numberOfItems,
            owner: owner.name,
            ownerId: owner.id,
            currentUserName,
            currentUserId,
            paymentId: data.razorpay_payment_id,
            status: 'paid',
            timestamp: firestore.FieldValue.serverTimestamp(),
          });
  
          console.log('Order added successfully:', {
            enteredLocation,
            items,
            totalPrice,
            numberOfItems,
            owner: owner.name,
            ownerId: owner.id,
            currentUserName,
            currentUserId,
            paymentId: data.razorpay_payment_id,
            status: 'paid',
            timestamp: firestore.FieldValue.serverTimestamp(),
          });
  
          Alert.alert('Success', 'Your order has been placed successfully.');
          navigation.navigate("UserHome")
        } catch (error) {
          console.error('Error saving order data:', error);
          Alert.alert('Error', 'Failed to place order. Please try again.');
        }
      })
      .catch(error => {
        // Handle failure
        console.error('Payment error:', error);
        Alert.alert('Error', 'Payment failed. Please try again.');
      });
  };
  

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={owners}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleOrder(item)}>
            <View style={styles.ownerCard}>
              <Image
                source={{
                  uri: 'https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg',
                }}
                style={styles.onlineImage}
              />
              <Text style={styles.ownerName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ownerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  onlineImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  ownerName: {
    fontWeight: 'bold',
    color: 'black',
  },
  orderButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SelectOwner;
