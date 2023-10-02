'use client';
import Toast from '@common/Toast/Toast';
import React, { FC, ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';

interface IMainProps {
  children: ReactNode;
}

const Main: FC<IMainProps> = ({ children }) => {
  return (
    <main>
      {children}
      <Toast />
    </main>
  );
};

export default Main;
