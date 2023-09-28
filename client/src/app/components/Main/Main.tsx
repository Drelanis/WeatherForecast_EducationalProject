import React, { FC, ReactNode } from 'react';

interface IMainProps {
  children: ReactNode;
}

const Main: FC<IMainProps> = ({ children }) => {
  return <main>{children}</main>;
};

export default Main;
