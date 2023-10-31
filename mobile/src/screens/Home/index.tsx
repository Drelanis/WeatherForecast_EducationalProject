import { AuthContext } from 'context/index';
import React, { FC, useContext, useEffect } from 'react';
import { Text } from 'react-native';

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

  return <Text>Home</Text>;
};

export default Home;
