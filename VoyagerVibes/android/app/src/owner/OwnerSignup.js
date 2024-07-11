import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../component/CustomButton';

const InputField = ({ label, value, onChangeText, keyboardType = 'default', secureTextEntry = false }) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
      style={[styles.input, { borderRadius: 25 }]}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      theme={{ colors: { primary: 'yellow', background: 'pink' } }}
    />
  );
};

const OwnerSignup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const userSignup = async () => {
    setLoading(true);
    if (!email || !password || !name || !phoneNumber) {
      alert('Please fill in all the fields');
      setLoading(false);
      return;
    }
    try {
      const result = await auth().createUserWithEmailAndPassword(email, password);
      await firestore().collection('allUsers').doc(result.user.uid).set({
        name: name,
        email: result.user.email,
        phoneNumber: phoneNumber,
        uid: result.user.uid,
        role: 'owner',
        status: 'online',
      });
    
      navigation.navigate('EnterOwnerHome');
    } catch (err) {
      alert('Something went wrong');
     
    } finally {
        setLoading(false);
      setEmail('');
      setPassword('');
      setName('');
      setPhoneNumber('');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="pink" />;
  }
  const goToUserLogin = () => {
    navigation.navigate('UserLogin');
  };

  return (
    <View style={styles.container}>
     <CustomButton
        buttonText="Switch to User"
        onPress={goToUserLogin}
        style={{ top: 10, right: 10 }} 
      />
      <View style={styles.box1}>
        <Text style={styles.text}>Welcome to VoyogarVibes</Text>
      </View>
      <View style={styles.box2}>
        <InputField
          label=" Enter Email"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />
        <InputField
          label=" Enter Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <InputField
          label=" Enter Name"
          value={name}
          onChangeText={text => setName(text)}
        />
        <InputField
          label=" Enter Phone Number"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          keyboardType="phone-pad"
        />
        <Button mode="contained" onPress={userSignup} style={styles.button} color="pink">
          Signup
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('OwnerLogin')}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    padding: 20,
  },
  text: {
    fontSize: 22,
    color: 'green',
    marginVertical: 10,
    textAlign: 'center',
  },
  box1: {
    marginTop: 20,
  },
  box2: {
    justifyContent: 'center',
  },
  input: {
    marginVertical: 10,
    borderColor: 'yellow', 
    
  },
  button: {
    marginVertical: 10,
    borderRadius: 5,
  },
  loginText: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default OwnerSignup;
