import React, { FC, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from 'apollo/client';
import { PaperProvider } from 'react-native-paper';
import { IAuth } from 'lib/interfaces';
import { AuthContext, LoadingContext } from 'context/index';
import Toast from 'react-native-toast-message';

interface IAppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: FC<IAppProvidersProps> = ({ children }) => {
  const [auth, setAuth] = useState<IAuth | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  return (
    <ApolloProvider client={client}>
      <LoadingContext.Provider value={{ isLoading, setLoading }}>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <PaperProvider>
            {children}
            <Toast />
          </PaperProvider>
        </AuthContext.Provider>
      </LoadingContext.Provider>
    </ApolloProvider>
  );
};

export default AppProviders;
