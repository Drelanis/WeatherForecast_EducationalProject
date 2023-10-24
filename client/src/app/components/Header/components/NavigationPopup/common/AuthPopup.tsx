import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import useLogout from '@components/Header/components/NavigationPopup/hooks/useLogout';
import useHandlePageRedirect from '@hooks/useHandlePageRedirect';
import { ListItemIcon, ListItemText } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AuthPopup = () => {
  const { handlePageRedirect } = useHandlePageRedirect();
  const { handleLogout } = useLogout();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleTransition = (path: string) => {
    handlePageRedirect(path);
    setAnchorEl(null);
  };

  return (
    <>
      <MenuItem href="/profile" onClick={() => handleTransition('/profile')}>
        <ListItemIcon>
          <AccountCircleIcon fontSize="medium" />
        </ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleLogout()}>
        <ListItemIcon>
          <LogoutIcon fontSize="medium" />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </>
  );
};

export default AuthPopup;
