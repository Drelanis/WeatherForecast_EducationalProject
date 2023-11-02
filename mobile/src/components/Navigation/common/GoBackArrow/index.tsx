import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';

const GoBackArrow = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', marginRight: 5 }}
      onPress={() => navigation.goBack()}
    >
      <Avatar.Image size={40} source={require('assets/left-arrow.png')} />
    </TouchableOpacity>
  );
};

export default GoBackArrow;
