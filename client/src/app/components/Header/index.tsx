'use client';
import React from 'react';
import NavigationMenu from './components/NavigationMenu/NavigationMenu';
import styles from './index.module.scss';

export const Header = () => {
  return <NavigationMenu className={styles.header} />;
};
