import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Orders from './Orders';
import UserProfile from './UserProfile';
import UserLogout from '../UserLogout';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Orders"
        component={Orders}
      />
      <Drawer.Screen
        name="UserProfile"
        component={UserProfile}
      />
      <Drawer.Screen
        name="UserLogout"
        component={UserLogout}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
