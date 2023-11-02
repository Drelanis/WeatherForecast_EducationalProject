import { ScreenContainer } from 'common/ScreenContainer';
import { AuthContext } from 'context/index';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import SearchBar from './components/SearchBar';
import UserCities from './components/UserCities';
import { ScrollView } from 'react-native';
import ScrollUpButton from 'common/ScrollUpButton';
import useScrollUp from 'hooks/useScrollUp';

interface IHomeProps {
  navigation: any;
}

const Home: FC<IHomeProps> = ({ navigation }) => {
  const { auth } = useContext(AuthContext);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const { handleScroll, scrollToTop, isScrolled } = useScrollUp(scrollViewRef);

  useEffect(() => {
    if (!auth) {
      navigation.navigate('Signup');
    }
  }, [auth]);

  return (
    <ScreenContainer style={{ flex: 1 }}>
      <SearchBar />
      <ScrollView
        ref={scrollViewRef}
        onScroll={(event) => handleScroll(event)}
        scrollEventThrottle={16}
      >
        <UserCities />
      </ScrollView>
      {isScrolled && <ScrollUpButton scrollToTop={scrollToTop} />}
    </ScreenContainer>
  );
};

export default Home;
