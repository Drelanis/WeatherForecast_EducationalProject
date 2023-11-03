import { useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';

const useScrollUp = (
  flatListRef: React.MutableRefObject<ScrollView | null>
) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setIsScrolled(scrollPosition > 50);
  };

  const scrollToTop = () => {
    flatListRef?.current?.scrollTo({ y: 0, animated: true });
  };

  return { handleScroll, scrollToTop, isScrolled };
};

export default useScrollUp;
