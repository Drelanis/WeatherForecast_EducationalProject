import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import Home from 'screens/Home';
import Profile from 'screens/Profile';
import AuthDrawerContent from './components/DrawerContent';

const Drawer = createDrawerNavigator();

const AuthBottomNavigation: FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <AuthDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Profile" component={Profile} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AuthBottomNavigation;
