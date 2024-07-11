import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Text, Button, ActivityIndicator, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import CustomButton from '../component/CustomButton';

const OwnerLogin = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const handleLogin = () => {
    setIsLoadingLogin(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setIsLoadingLogin(false);
        navigation.navigate('EnterOwnerHome');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      })
      .finally(() => {
        setIsLoadingLogin(false);
      });
  };

  const navigateToSignup = () => {
    navigation.navigate('OwnerSignup');
  };
  const goToUserLogin = () => {
    navigation.navigate('UserLogin');
  };

  return (
    <View style={[styles.container, { backgroundColor: 'pink' }]}>
     <CustomButton
        buttonText="Switch to User"
        onPress={goToUserLogin}
        style={{ top: 10, right: 10 }} 
      />
      <View style={styles.regTextContainer}>
        <Text style={styles.regText}>Owner Login</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          label="Enter Your Email"
          value={email}
          placeholderTextColor="black"
          onChangeText={text => setEmail(text)}
          style={styles.textInput}
          mode="outlined"
          theme={{
            colors: { primary: theme.colors.yellow }, 
          }}
        />
      </View>
      <View style={[styles.inputContainer, { marginTop: 10 }]}>
        <TextInput
          label="Enter Your Password"
          value={password}
          onChangeText={text => setPassword(text)}
          placeholderTextColor="black"
          style={styles.textInput}
          secureTextEntry
          mode="outlined"
          theme={{
            colors: { primary: theme.colors.yellow }, 
          }}
        />
      </View>

      <View style={styles.loginButtonContainer}>
        {isLoadingLogin ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.loginButton}>
            Log in
          </Button>
        )}
      </View>
      <View>
        <TouchableOpacity onPress={navigateToSignup}>
          <Text style={styles.registerText}>
            Don't have a clarity account? Register now
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
  },
  regTextContainer: {
    marginLeft: 10,
    marginTop: 10,
  },
  regText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20, 
    fontWeight: 'bold', 
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  textInput: {
    flex: 1,
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

export default OwnerLogin;
