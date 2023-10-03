'use client';
import { FC } from 'react';
import Button from '@mui/material/Button';
import NavigationPopup from '@components/Header/components/NavigationPopup/NavigationPopup';
import { useRouter } from 'next/navigation';

interface NavigationMenuProps {
  className: string;
}

const NavigationMenu: FC<NavigationMenuProps> = ({ className }) => {
  const router = useRouter();
  return (
    <div className={className}>
      <Button
        id="home-button"
        onClick={() => {
          if (!localStorage.getItem('accessToken')) {
            return router.push('/login');
          }
          router.push('/home');
        }}
      >
        Home
      </Button>
      <Button
        id="weather-button"
        onClick={() => {
          if (!localStorage.getItem('accessToken')) {
            return router.push('/login');
          }
          router.push('/weather');
        }}
      >
        Weather
      </Button>
      <NavigationPopup />
    </div>
  );
};

export default NavigationMenu;
