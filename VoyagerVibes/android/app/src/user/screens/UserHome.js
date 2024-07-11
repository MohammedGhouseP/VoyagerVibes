import { View, Text, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './bottomScreens/Home';
import Chats from './bottomScreens/Chats';
import Cart from './bottomScreens/Cart';
import Account from './bottomScreens/Account';

const Tab = createBottomTabNavigator();

const UserHome = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: 'pink' },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarItemStyle: { paddingVertical: 5 },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assests/home_filled.png')
                  : require('../../assests/home.png')
              }
              style={{ width: 20, height: 20, tintColor: 'white' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chats}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assests/chat_filled.png')
                  : require('../../assests/chat.png')
              }
              style={{ width: 20, height: 20, tintColor: 'white' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assests/cart_filled.png')
                  : require('../../assests/cart.png')
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
                  ? require('../../assests/account_filled.png')
                  : require('../../assests/account.png')
              }
              style={{ width: 20, height: 20, tintColor: 'white' }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default UserHome;
