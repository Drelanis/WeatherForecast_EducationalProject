import { useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

const useScrollUp = (flatListRef: React.MutableRefObject<any>) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setIsScrolled(scrollPosition > 50);
  };

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  return { handleScroll, scrollToTop, isScrolled };
};

export default useScrollUp;
