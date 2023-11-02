import { ScreenContainer } from 'common/ScreenContainer';
import { AuthContext } from 'context/index';
import React, { FC, useContext, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import UserCities from './components/UserCities';

interface IHomeProps {
  navigation: any;
}

const Home: FC<IHomeProps> = ({ navigation }) => {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth) {
      navigation.navigate('Signup');
    }
  }, [auth]);

  return (
    <ScreenContainer style={{ flex: 1 }}>
      <SearchBar />
      <UserCities />
    </ScreenContainer>
  );
};

export default Home;
