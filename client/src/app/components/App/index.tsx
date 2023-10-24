'use client';
import { Header } from '@components/Header';
import Main from '@components/Main';
import { AuthContext } from 'src/app/context';
import useRefresh from '@hooks/useRefresh';
import React, { useContext, useEffect } from 'react';

const App = ({ children }: { children: React.ReactNode }) => {
  const { handleRefresh } = useRefresh();
  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuth) {
      handleRefresh();
    }
  }, []);

  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
};

export default App;
