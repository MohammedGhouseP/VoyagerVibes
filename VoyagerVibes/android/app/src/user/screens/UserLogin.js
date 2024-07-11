import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {TextInput, Text, Button, ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import CustomButton from '../../component/CustomButton';

const UserLogin = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const handleLogin = () => {
    setIsLoadingLogin(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setIsLoadingLogin(false);
        navigation.navigate('EnterUserHome');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error', 'That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'That email address is invalid!');
        }

        Alert.alert('Error', error.message);
        setIsLoadingLogin(false);
      });
  };

  const navigateToSignup = () => {
    navigation.navigate('UserSignup');
  };
  const goToOwnerLogin = () => {
    navigation.navigate('OwnerLogin');
  };

  return (
    <View style={styles.container}>
     <CustomButton
        buttonText="Switch to Owner"
        onPress={goToOwnerLogin}
        style={{ top: 10, right: 10 }} 
      />
      <View style={styles.regTextContainer}>
        <Text style={styles.regText}>User Login</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          label="Enter Your Email"
          value={email}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          style={styles.textInput}
          mode="outlined"
          theme={{ colors: { primary: 'yellow', placeholder: 'black' } }}
        />
      </View>
      <View style={[styles.inputContainer, {marginTop: 10}]}>
        <TextInput
          label="Enter Your Password"
          value={password}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          style={styles.textInput}
          secureTextEntry
          mode="outlined"
          theme={{ colors: { primary: 'yellow', placeholder: 'black' } }}
        />
      </View>

      <View style={styles.loginButtonContainer}>
        {isLoadingLogin ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.loginButton}
            color="pink">
            Log in
          </Button>
        )}
      </View>
      <View>
        <TouchableOpacity onPress={navigateToSignup}>
          <Text style={styles.registerText}>
            Don't have an account? Register now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'pink',
  },
  regTextContainer: {
    marginTop: 10,
  },
  regText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20, 
    fontWeight: 'bold', 
  },
  inputContainer: {
    marginTop: 20,
    marginLeft: 10,
  },
  textInput: {
    borderColor: 'yellow',
  },
  loginButtonContainer: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  loginButton: {
    borderRadius: 5,
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default UserLogin;
