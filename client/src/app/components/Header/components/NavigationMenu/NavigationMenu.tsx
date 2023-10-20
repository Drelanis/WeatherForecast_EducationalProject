'use client';
import { FC } from 'react';
import Button from '@mui/material/Button';
import NavigationPopup from '@components/Header/components/NavigationPopup/NavigationPopup';
import usePrivateUrl from '@hooks/usePrivateUrl';
import { Box } from '@mui/material';

interface NavigationMenuProps {
  className: string;
}

const NavigationMenu: FC<NavigationMenuProps> = ({ className }) => {
  const [redirect] = usePrivateUrl();

  return (
    <Box className={className}>
      <Button id="home-button" onClick={() => redirect('/home')}>
        Home
      </Button>
      <Button id="weather-button" onClick={() => redirect('/weather')}>
        Weather
      </Button>
      <NavigationPopup />
    </Box>
  );
};

export default NavigationMenu;
