import React, { useState, MouseEvent } from 'react';
import MenuItem from '@mui/material/MenuItem';
import useHandlePageRedirect from '@hooks/useHandlePageRedirect';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import { ListItemIcon, ListItemText } from '@mui/material';

const NotAuthPopup = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { handlePageRedirect } = useHandlePageRedirect();
  const open = Boolean(anchorEl);

  const handleTransition = (path: string) => {
    handlePageRedirect(path);
    setAnchorEl(null);
  };

  return (
    <>
      <MenuItem href="/login" onClick={() => handleTransition('/login')}>
        <ListItemIcon>
          <LockOpenRoundedIcon fontSize="medium" />
        </ListItemIcon>
        <ListItemText>Login</ListItemText>
      </MenuItem>
      <MenuItem
        href="/registration"
        onClick={() => handlePageRedirect('/registration')}
      >
        <ListItemIcon>
          <AppRegistrationRoundedIcon fontSize="medium" />
        </ListItemIcon>
        <ListItemText>Registration</ListItemText>
      </MenuItem>
    </>
  );
};

export default NotAuthPopup;
