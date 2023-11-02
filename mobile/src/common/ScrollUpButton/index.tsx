import React, { FC } from 'react';
import { Button } from 'react-native-paper';

interface IScrollUpButtonProps {
  scrollToTop: () => void;
}

const ScrollUpButton: FC<IScrollUpButtonProps> = ({ scrollToTop }) => {
  return (
    <Button
      icon="arrow-up-bold"
      onPress={scrollToTop}
      style={{
        position: 'absolute',
        top: '95%',
        right: 20,
        backgroundColor: 'black',
        width: 100,
        marginLeft: 'auto',
      }}
    >
      UP
    </Button>
  );
};

export default ScrollUpButton;
