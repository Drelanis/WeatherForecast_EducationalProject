import { useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';

const useScrollUp = (
  scrollViewRef: React.MutableRefObject<ScrollView | null>
) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setIsScrolled(scrollPosition > 200);
  };

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  return { handleScroll, scrollToTop, isScrolled };
};

export default useScrollUp;
