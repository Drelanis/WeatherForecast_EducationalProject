import { ScreenContainer } from 'common/ScreenContainer';
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

  return (
    <ScreenContainer style={{ flex: 1 }}>
      <Text>Profile</Text>
    </ScreenContainer>
  );
};

export default Profile;
