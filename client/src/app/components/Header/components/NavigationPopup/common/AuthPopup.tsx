import React, { FC, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import useLogout from '@components/Header/components/NavigationPopup/hooks/useLogout';
import useHandlePageRedirect from '@hooks/useHandlePageRedirect';
import { Divider, ListItemIcon, ListItemText } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface IAuthPopupProps {
  handleClose: () => void;
}

const AuthPopup: FC<IAuthPopupProps> = ({ handleClose }) => {
  const { handlePageRedirect } = useHandlePageRedirect();
  const { handleLogout } = useLogout();

  const handleTransition = (path: string) => {
    handleClose();
    handlePageRedirect(path);
  };

  const logout = () => {
    handleClose();
    handleLogout();
  };

  return (
    <>
      <MenuItem href="/profile" onClick={() => handleTransition('/profile')}>
        <ListItemIcon>
          <AccountCircleIcon fontSize="medium" />
        </ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => logout()}>
        <ListItemIcon>
          <LogoutIcon fontSize="medium" />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </>
  );
};

export default AuthPopup;
