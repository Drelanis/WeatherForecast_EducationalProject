import React, { useEffect, useContext } from 'react';
import useRefresh from 'hooks/useRefresh';
import { AuthContext, LoadingContext } from 'context/index';
import AuthBottomNavigation from './components/AuthBottomNavigation';
import NotAuthBottomNavigation from './components/NotAuthBottomNavigation';
import ScreenLoader from 'common/ScreenLoader';

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
    <>
      {auth?.isAuth && <AuthBottomNavigation />}
      {!auth?.isAuth && <NotAuthBottomNavigation />}
    </>
  );
};

export default Navigation;
