import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Cart = () => {
  const [orders, setOrders] = useState([]);
  const currentUser = auth().currentUser;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (currentUser) {
          const ordersSnapshot = await firestore().collection('orders').where('currentUserId', '==', currentUser.uid).get();
          const ordersData = ordersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(ordersData);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [currentUser]);

  // Function to group orders by owner name
  const groupOrdersByOwner = () => {
    const groupedOrders = {};
    orders.forEach(order => {
      if (!groupedOrders[order.owner]) {
        groupedOrders[order.owner] = [];
      }
      groupedOrders[order.owner].push(order);
    });
    return groupedOrders;
  };

  const renderItem = (item) => (
    <View key={item.id} style={styles.itemContainer}>
      <Text style={styles.text}>Location: {item.enteredLocation}</Text>
      <Text style={styles.text}>Items: {item.items.name} (Qty: {item.items.quantity})</Text>
      <Text style={styles.text}>Total Price: ${item.totalPrice}</Text>
    </View>
  );

  const renderOwnerOrders = () => {
    const groupedOrders = groupOrdersByOwner();
    return Object.keys(groupedOrders).map(owner => (
      <View key={owner}>
        <Text style={[styles.ownerName, { color: 'blue' }]}>{owner}</Text>
        {groupedOrders[owner].map(order => renderItem(order))}
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      {renderOwnerOrders()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  itemContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black', 
  },
  ownerName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Cart;
