import React, { useState, MouseEvent } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';

const NotAuthPopup = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleTransition = (event?: MouseEvent) => {
    if (event) {
      const button = event.target as HTMLButtonElement;
      router.push(button.getAttribute('href')!);
    }
    setAnchorEl(null);
  };

  return (
    <MenuItem href="/login" onClick={(event) => handleTransition(event)}>
      Login
    </MenuItem>
  );
};

export default NotAuthPopup;
