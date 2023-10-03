'use client';
import Footer from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import Main from '@components/Main/Main';
import { AuthContext } from '@context';
import useRefresh from '@hooks/useRefresh';
import React, { useContext, useEffect, useState } from 'react';

const App = ({ children }: { children: React.ReactNode }) => {
  const { handleRefresh } = useRefresh();
  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem('accessToken') && !isAuth) {
      handleRefresh();
    }
  }, []);

  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default App;
