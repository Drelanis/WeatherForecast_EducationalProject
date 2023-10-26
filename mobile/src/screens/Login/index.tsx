import React from 'react';
import { Button, Text, View, TextInput } from 'react-native';

const Login = () => {
  return (
    <View>
      <Text>LOGIN</Text>
      <TextInput placeholder="email"></TextInput>
      <TextInput placeholder="password"></TextInput>
      <Button title="LOGIN"></Button>
    </View>
  );
};

export default Login;
