import { AuthContext } from 'context/index';
import React, { FC, useContext, useEffect } from 'react';
import { Text } from 'react-native';

interface IProfileProps {
  navigation: any;
}

const Profile: FC<IProfileProps> = ({ navigation }) => {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth) {
      navigation.navigate('Signup');
    }
  }, [auth]);

  return <Text>Profile</Text>;
};

export default Profile;
