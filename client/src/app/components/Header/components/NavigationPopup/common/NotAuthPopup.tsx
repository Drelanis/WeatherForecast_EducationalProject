import React, { useState, MouseEvent } from 'react';
import MenuItem from '@mui/material/MenuItem';
import useHandlePageRedirect from '@hooks/useHandlePageRedirect';

const NotAuthPopup = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { handlePageRedirect } = useHandlePageRedirect();
  const open = Boolean(anchorEl);

  const handleTransition = (path: string) => {
    handlePageRedirect(path);
    setAnchorEl(null);
  };

  return (
    <MenuItem href="/login" onClick={() => handleTransition('/login')}>
      Login
    </MenuItem>
  );
};

export default NotAuthPopup;
