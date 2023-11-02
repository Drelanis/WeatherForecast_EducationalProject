import { ScreenContainer } from 'common/ScreenContainer';
import ScreenLoader from 'common/ScreenLoader';
import { AuthContext } from 'context/index';
import useProfile from 'hooks/useProfile';
import getLetters from 'lib/helpers/getLetters';
import React, { FC, useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Email, FullName, ProfileContainer, ProfileData } from './styled';

interface IProfileProps {
  navigation: any;
}

const Profile: FC<IProfileProps> = ({ navigation }) => {
  const { auth } = useContext(AuthContext);
  const { data, loading, error } = useProfile();

  useEffect(() => {
    if (!auth) {
      navigation.navigate('Signup');
    }
  }, [auth]);

  if (loading) {
    return <ScreenLoader />;
  }

  return (
    <ScreenContainer style={{ flex: 1 }}>
      <ProfileContainer>
        <Avatar.Text
          size={100}
          label={getLetters(data?.getUser.fullName)}
          color="white"
          style={{ backgroundColor: 'rgb(80 70 255)' }}
        />
        <ProfileData>
          <FullName>{data?.getUser.fullName}</FullName>
          <Email>{data?.getUser.email}</Email>
        </ProfileData>
      </ProfileContainer>
    </ScreenContainer>
  );
};

export default Profile;
