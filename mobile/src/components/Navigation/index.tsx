import React, { useEffect, useContext } from 'react';
import useRefresh from 'hooks/useRefresh';
import { AuthContext } from 'context/index';
import AuthBottomNavigation from './components/AuthBottomNavigation';
import NotAuthBottomNavigation from './components/NotAuthBottomNavigation';
import ScreenLoader from 'common/ScreenLoader';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from 'screens/Home';
import SignupForm from 'screens/Login';

const Drawer = createDrawerNavigator();

const Navigation = () => {
  const { handleRefresh, isLoading } = useRefresh();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    handleRefresh();
  }, []);

  if (isLoading || !auth) {
    return <ScreenLoader />;
  }

  return (
    <>
      {auth?.isAuth && <AuthBottomNavigation />}
      {!auth?.isAuth && <NotAuthBottomNavigation />}
    </>
  );
};

export default Navigation;
