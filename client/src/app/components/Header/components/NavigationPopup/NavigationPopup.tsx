import React, { MouseEvent, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';

const NavigationPopup = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTransition = (event?: MouseEvent) => {
    if (event) {
      const button = event.target as HTMLButtonElement;
      router.push(button.getAttribute('href')!);
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="profile-button"
        aria-controls={anchorEl ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Profile
      </Button>
      <Menu
        id="profile-menu"
        aria-labelledby="profile-button"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleTransition()}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem href="/profile" onClick={(event) => handleTransition(event)}>
          Profile
        </MenuItem>
        <MenuItem href="/login" onClick={(event) => handleTransition(event)}>
          Login
        </MenuItem>
        <MenuItem
          href="/registration"
          onClick={(event) => handleTransition(event)}
        >
          Registration
        </MenuItem>
        <MenuItem href="/logout" onClick={(event) => handleTransition(event)}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavigationPopup;
