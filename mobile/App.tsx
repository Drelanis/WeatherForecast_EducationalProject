import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { AppRegistry } from 'react-native';
import client from 'apollo/client';
import SignupForm from 'screens/Login';
import { PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <SignupForm />
      </PaperProvider>
    </ApolloProvider>
  );
};

AppRegistry.registerComponent('MyApplication', () => App);

export default App;
