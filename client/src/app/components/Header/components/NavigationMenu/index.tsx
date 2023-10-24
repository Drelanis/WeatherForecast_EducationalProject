'use client';
import { FC } from 'react';
import NavigationPopup from '@components/Header/components/NavigationPopup';
import usePrivateUrl from '@hooks/usePrivateUrl';
import { Box, IconButton } from '@mui/material';
import Image from 'next/image';
import icon from './public/main-icon.png';
import styles from './index.module.scss';

const NavigationMenu: FC = () => {
  const [redirect] = usePrivateUrl();

  return (
    <Box className={styles.header}>
      <IconButton
        className={styles.home}
        id="weather-button"
        onClick={() => redirect('/weather')}
      >
        <Image src={icon} alt="main-icon" width={70} height={70} />
        <Box>REAL TIME WEATHER</Box>
      </IconButton>
      <NavigationPopup />
    </Box>
  );
};

export default NavigationMenu;
