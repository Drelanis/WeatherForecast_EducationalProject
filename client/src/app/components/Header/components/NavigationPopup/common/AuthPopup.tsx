import React, { useState, MouseEvent } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';
import useLogout from '@hooks/useLogout';

const AuthPopup = () => {
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

  const { handleLogout } = useLogout();

  return (
    <>
      <MenuItem href="/profile" onClick={(event) => handleTransition(event)}>
        Profile
      </MenuItem>
      <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
    </>
  );
};

export default AuthPopup;
