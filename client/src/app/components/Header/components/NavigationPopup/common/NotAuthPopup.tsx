import React, { FC, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import useHandlePageRedirect from '@hooks/useHandlePageRedirect';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import { ListItemIcon, ListItemText } from '@mui/material';

interface INotAuthPopupProps {
  handleClose: () => void;
}

const NotAuthPopup: FC<INotAuthPopupProps> = ({ handleClose }) => {
  const { handlePageRedirect } = useHandlePageRedirect();

  const handleTransition = (path: string) => {
    handleClose();
    handlePageRedirect(path);
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
