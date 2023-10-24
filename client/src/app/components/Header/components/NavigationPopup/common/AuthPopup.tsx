import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import useLogout from '@components/Header/components/NavigationPopup/hooks/useLogout';
import useHandlePageRedirect from '@hooks/useHandlePageRedirect';

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
        Profile
      </MenuItem>
      <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
    </>
  );
};

export default AuthPopup;
