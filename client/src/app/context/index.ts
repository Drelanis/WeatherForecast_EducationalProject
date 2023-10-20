import { Dispatch, SetStateAction, createContext } from 'react';

export const AuthContext = createContext<{
  isAuth: boolean;
  setAuth: Dispatch<SetStateAction<boolean>>;
}>({
  isAuth: false,
  setAuth: () => {},
});

export const PageLoadingContext = createContext<{
  showLoader: () => void;
  hideLoader: () => void;
  isLoading: boolean;
}>({
  showLoader: () => {},
  hideLoader: () => {},
  isLoading: false,
});
