import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Orders from './bottomScreens/Orders';
import Account from './bottomScreens/Account';
import OwnerChat from './bottomScreens/OwnerChat';

const Tab = createBottomTabNavigator();

const OwnerHome = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarItemStyle: { paddingVertical: 5 },
        tabBarStyle: { backgroundColor: 'pink' },
      }}>
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assests/cart_filled.png')
                  : require('../assests/cart.png')
              }
              style={{ width: 20, height: 20, tintColor: 'white' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={OwnerChat}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assests/chat_filled.png')
                  : require('../assests/chat.png')
              }
              style={{ width: 20, height: 20, tintColor: 'white' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assests/account_filled.png')
                  : require('../assests/account.png')
              }
              style={{ width: 20, height: 20, tintColor: 'white' }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default OwnerHome;
