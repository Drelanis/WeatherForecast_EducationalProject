import { ScreenContainer } from 'common/ScreenContainer';
import { AuthContext } from 'context/index';
import React, { FC, useContext, useEffect } from 'react';

import SearchBar from './components/SearchBar';

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
    <ScreenContainer>
      <SearchBar />
    </ScreenContainer>
  );
};

export default Home;
