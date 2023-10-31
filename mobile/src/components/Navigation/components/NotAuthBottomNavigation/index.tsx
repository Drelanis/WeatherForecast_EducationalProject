import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import LoginForm from 'screens/Login';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const NotAuthBottomNavigation: FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={LoginForm} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default NotAuthBottomNavigation;
