import React from 'react';
import { DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useLogout from './hooks/useLogout';

const DrawerLogout = () => {
  const { handleLogout } = useLogout();

  const handleCustomAction = () => {
    handleLogout();
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

export default DrawerLogout;
