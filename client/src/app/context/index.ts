import { Dispatch, SetStateAction, createContext } from 'react';

export const AuthContext = createContext<{
  isAuth: boolean;
  setAuth: Dispatch<SetStateAction<boolean>>;
}>({
  isAuth: false,
  setAuth: () => {},
});
