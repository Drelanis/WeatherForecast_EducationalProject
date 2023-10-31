import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import Navigation from 'components/Navigation';
import AppProviders from 'components/Providers';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <AppProviders>
      {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
      <Navigation />
      {/* </GestureHandlerRootView> */}
    </AppProviders>
  );
};

AppRegistry.registerComponent('MyApplication', () => App);

export default App;
