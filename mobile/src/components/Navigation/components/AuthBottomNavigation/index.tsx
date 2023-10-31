import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import Home from 'screens/Home';
import Profile from 'screens/Profile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from 'react-native-paper';

const Drawer = createDrawerNavigator();

const CustomButton = () => {
  const handleCustomAction = () => {
    console.log('Logout');
  };

  return (
    <DrawerItem
      label="Logout"
      onPress={handleCustomAction}
      icon={({ color, size }) => (
        <Icon name="logout" size={size} color={color} />
      )}
    />
  );
};

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Divider />
      <CustomButton />
    </DrawerContentScrollView>
  );
};

const AuthBottomNavigation: FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Profile" component={Profile} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AuthBottomNavigation;
