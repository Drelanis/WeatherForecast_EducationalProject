import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry, View } from 'react-native';
import Navigation from 'components/Navigation';
import AppProviders from 'components/Providers';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <AppProviders>
      <Navigation />
      <Toast position="bottom" />
    </AppProviders>
  );
};

AppRegistry.registerComponent('MyApplication', () => App);

export default App;
