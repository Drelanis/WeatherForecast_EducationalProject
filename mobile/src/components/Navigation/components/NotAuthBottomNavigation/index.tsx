import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import LoginForm from 'screens/Login';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const NotAuthDrawerNavigation: FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Login">
      <Drawer.Screen name="Login" component={LoginForm} />
    </Drawer.Navigator>
  );
};

export default NotAuthDrawerNavigation;
