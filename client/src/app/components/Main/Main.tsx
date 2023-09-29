'use client';
import { ApolloProvider } from '@apollo/client';
import Toast from '@common/Toast/Toast';
import React, { FC, ReactNode } from 'react';
import client from 'src/apollo/apolloClient';
import 'react-toastify/dist/ReactToastify.css';

interface IMainProps {
  children: ReactNode;
}

const Main: FC<IMainProps> = ({ children }) => {
  return (
    <main>
      <ApolloProvider client={client}>{children}</ApolloProvider>
      <Toast />
    </main>
  );
};

export default Main;
