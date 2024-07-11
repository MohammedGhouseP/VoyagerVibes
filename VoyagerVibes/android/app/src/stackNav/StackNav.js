import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../commonScreens/splash/Splash';
import SelectionScreen from '../commonScreens/SelectionScreen';
import UserSignup from '../user/screens/UserSignup';
import UserLogin from '../user/screens/UserLogin';
import UserHome from '../user/screens/UserHome';
import UserLogout from '../user/screens/UserLogout';
import OwnerSignup from '../owner/OwnerSignup';
import OwnerLogin from '../owner/OwnerLogin';
import OwnerHome from '../owner/OwnerHome';
import OwnerLogout from '../owner/OwnerLogout';
import EnterUserHome from '../user/screens/EnterUserHome';
import EnterOwnerHome from '../owner/EnterOwnerHome';
import FoodItems from '../user/screens/FoodItems';
import SelectOwner from '../user/screens/SelectOwner';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectionScreen"
          component={SelectionScreen}
          options={{headerShown: false}}
        />
        {/*  Users */}
        <Stack.Screen
          name="UserSignup"
          component={UserSignup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserLogin"
          component={UserLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserHome"
          component={UserHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EnterUserHome"
          component={EnterUserHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FoodItems"
          component={FoodItems}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: 'pink'},
            headerTitleStyle: {fontWeight: 'bold', color: 'black'},
          }}
        />
         <Stack.Screen
          name="SelectOwner"
          component={SelectOwner}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: 'pink'},
            headerTitleStyle: {fontWeight: 'bold', color: 'black'},
          }}
        />
        {/* common screen */}
         <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: 'pink'},
            headerTitleStyle: {fontWeight: 'bold', color: 'black'},
          }}
        />
        {/*  Owners  */}
        <Stack.Screen
          name="UserLogout"
          component={UserLogout}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OwnerSignup"
          component={OwnerSignup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OwnerLogin"
          component={OwnerLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OwnerHome"
          component={OwnerHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EnterOwnerHome"
          component={EnterOwnerHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OwnerLogout"
          component={OwnerLogout}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
