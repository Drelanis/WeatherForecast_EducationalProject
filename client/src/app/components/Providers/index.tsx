'use client';
import React, { FC, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '@apolloGraphQL/apolloClient';
import { AuthContext } from 'src/app/context';
import { LoaderProvider } from './LoadingProvider';

interface IProvidersProps {
  children: React.ReactNode;
}

export const Providers: FC<IProvidersProps> = ({ children }) => {
  const [isAuth, setAuth] = useState(false);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ isAuth, setAuth }}>
        <LoaderProvider>{children}</LoaderProvider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
};
