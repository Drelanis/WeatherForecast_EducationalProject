import React from 'react';
import NavigationMenu from './components/NavigationMenu/NavigationMenu';
import styles from './header.module.css';

export const Header = () => {
  return <NavigationMenu className={styles.header} />;
};
