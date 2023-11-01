import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Divider } from 'react-native-paper';
import DrawerLogout from './components/DrawerLogout';

const AuthDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Divider />
      <DrawerLogout />
    </DrawerContentScrollView>
  );
};

export default AuthDrawerContent;
