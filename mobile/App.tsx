import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry, View } from 'react-native';
import Navigation from 'components/Navigation';
import AppProviders from 'components/Providers';

const App = () => {
  return (
    <AppProviders>
      <Navigation />
    </AppProviders>
  );
};

AppRegistry.registerComponent('MyApplication', () => App);

export default App;
