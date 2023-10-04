'use client';
import Toast from '@common/Toast/Toast';
import React, { FC, ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import styles from './main.module.scss';

interface IMainProps {
  children: ReactNode;
}

const Main: FC<IMainProps> = ({ children }) => {
  return (
    <main className={styles.main}>
      {children}
      <Toast />
    </main>
  );
};

export default Main;
