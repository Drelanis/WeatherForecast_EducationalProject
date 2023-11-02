import { useNavigation } from '@react-navigation/native';
import useProfile from 'hooks/useProfile';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Avatar } from 'react-native-paper';

const HeaderAvatar = () => {
  const navigation = useNavigation();
  const { data } = useProfile();

  return (
    <TouchableOpacity
      style={{ flexDirection: 'row' }}
      onPress={() => navigation.navigate('Profile' as never)}
    >
      <Text style={{ lineHeight: 55, fontSize: 20 }}>
        {data?.getUser.fullName}
      </Text>
      <Avatar.Image size={55} source={require('assets/avatar.jpg')} />
    </TouchableOpacity>
  );
};

export default HeaderAvatar;
