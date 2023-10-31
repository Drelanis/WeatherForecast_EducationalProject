import React, { FC, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from 'apollo/client';
import { PaperProvider } from 'react-native-paper';
import { IAuthContext, IAuth } from 'lib/interfaces';
import { AuthContext } from 'context/index';

interface IAppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: FC<IAppProvidersProps> = ({ children }) => {
  const [auth, setAuth] = useState<IAuth | null>(null);
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <PaperProvider>{children}</PaperProvider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

export default AppProviders;
