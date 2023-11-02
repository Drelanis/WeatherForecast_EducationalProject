import React, { useEffect, useContext } from 'react';
import useRefresh from 'hooks/useRefresh';
import { AuthContext, LoadingContext } from 'context/index';
import AuthDrawerNavigation from './components/AuthBottomNavigation';
import NotAuthDrawerNavigation from './components/NotAuthBottomNavigation';
import ScreenLoader from 'common/ScreenLoader';
import { NavigationContainer } from '@react-navigation/native';

const Navigation = () => {
  const { handleRefresh } = useRefresh();
  const { auth } = useContext(AuthContext);
  const { isLoading } = useContext(LoadingContext);

  useEffect(() => {
    handleRefresh();
  }, []);

  if (isLoading || !auth) {
    return <ScreenLoader />;
  }

  return (
    <NavigationContainer>
      {auth?.isAuth && <AuthDrawerNavigation />}
      {!auth?.isAuth && <NotAuthDrawerNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
