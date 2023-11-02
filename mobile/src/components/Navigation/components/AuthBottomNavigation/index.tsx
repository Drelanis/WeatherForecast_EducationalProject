import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { FC } from 'react';
import Home from 'screens/Home';
import Profile from 'screens/Profile';
import AuthDrawerContent from './components/DrawerContent';
import HeaderAvatar from './components/HeaderAvatar';
import GoBackArrow from 'components/Navigation/common/GoBackArrow';

const Drawer = createDrawerNavigator();

const AuthDrawerNavigation: FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <AuthDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => <HeaderAvatar />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerRight: () => <GoBackArrow />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default AuthDrawerNavigation;
