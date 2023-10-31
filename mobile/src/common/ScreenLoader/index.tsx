import React from 'react';
import { ActivityIndicator } from 'react-native';
import { LoaderText, LoaderView } from './styles';

const ScreenLoader = () => {
  return (
    <LoaderView>
      <ActivityIndicator size={'large'} />
      <LoaderText>Loading ...</LoaderText>
    </LoaderView>
  );
};

export default ScreenLoader;
