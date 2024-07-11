import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';

const FoodItems = ({ navigation }) => {
  const [enteredLocation, setEnteredLocation] = useState('');
  const [items, setItems] = useState([
    {
      id: 1,
      image: 'https://png.pngtree.com/png-clipart/20221001/ourmid/pngtree-fast-food-big-ham-burger-png-image_6244235.png',
      name: 'Burger',
      price: 5.99,
      quantity: 1,
    },
    {
      id: 2,
      image: 'https://png.pngtree.com/png-clipart/20230412/original/pngtree-modern-kitchen-food-boxed-cheese-lunch-pizza-png-image_9048155.png',
      name: 'Pizza',
      price: 8.99,
      quantity: 1,
    },
  ]);

  const incrementQuantity = index => {
    const updatedItems = [...items];
    updatedItems[index].quantity++;
    setItems(updatedItems);
  };

  const decrementQuantity = index => {
    const updatedItems = [...items];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity--;
      setItems(updatedItems);
    }
  };

  const getTotalPrice = item => {
    return item.price * item.quantity;
  };

  const handleOrder = selectedItem => {
   
    if (!enteredLocation.trim()) {
      // Show an alert  to notify the user to enter the location
      Alert.alert('Error', 'Please enter delivery location.');
      return;
    }
  
    const orderData = {
      enteredLocation: enteredLocation,
      items: selectedItem,
      totalPrice: selectedItem.price * selectedItem.quantity,
      numberOfItems: selectedItem.quantity,
    };
    console.log("Order Data:", orderData);
    navigation.navigate('SelectOwner', orderData);
  };
  

  const FoodItemCard = ({
    image,
    name,
    price,
    quantity,
    onIncrement,
    onDecrement,
  }) => (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{`$${getTotalPrice({ price, quantity }).toFixed(2)}`}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={onDecrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity style={styles.button} onPress={onIncrement}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.orderNowButton}
        onPress={() => handleOrder({  name: name, price: price, quantity: quantity })}>
        <Text style={styles.orderNowText}>Order Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Enter Delivery Location"
          placeholderTextColor="gray"
          onChangeText={text => setEnteredLocation(text)}
        />
        {items.map((item, index) => (
          <FoodItemCard
            key={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIncrement={() => incrementQuantity(index)}
            onDecrement={() => decrementQuantity(index)}
          />
        ))}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '80%',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    alignSelf: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
    color: 'blue',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'green',
    marginBottom: 5,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'yellow',
  },
  quantity: {
    fontSize: 16,
    color: 'black',
  },
  orderNowButton: {
    backgroundColor: 'yellow',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  orderNowText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default FoodItems;
