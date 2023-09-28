'use client';
import { FC } from 'react';
import Button from '@mui/material/Button';
import NavigationPopup from '@components/Header/components/NavigationPopup/NavigationPopup';

interface NavigationMenuProps {
  className: string;
}

const NavigationMenu: FC<NavigationMenuProps> = ({ className }) => {
  return (
    <div className={className}>
      <Button id="home-button">Home</Button>
      <Button id="weather-button">Weather</Button>
      <NavigationPopup />
    </div>
  );
};

export default NavigationMenu;
