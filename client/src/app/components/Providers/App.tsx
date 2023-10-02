'use client';
import React, { FC } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '@apolloGraphQL/apolloClient';

interface IProvidersProps {
  children: React.ReactNode;
}

export const Providers: FC<IProvidersProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
