'use client';
import React, { FC, useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '@apolloGraphQL/apolloClient';
import { AuthContext } from '@context';

interface IProvidersProps {
  children: React.ReactNode;
}

export const Providers: FC<IProvidersProps> = ({ children }) => {
  const [isAuth, setAuth] = useState(false);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ isAuth, setAuth }}>
        {children}
      </AuthContext.Provider>
    </ApolloProvider>
  );
};
