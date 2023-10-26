import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import AuthPopup from './common/AuthPopup';
import NotAuthPopup from './common/NotAuthPopup';
import { AuthContext } from '@context';
import { Box, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './index.module.scss';
import useProfile from '@hooks/useProfile';
import CircularProgress from '@mui/material/CircularProgress';

const NavigationPopup = () => {
  const { data, loading } = useProfile();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { isAuth } = useContext(AuthContext);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return (
      <Box sx={{ margin: 'auto 40px auto auto' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <IconButton
        id="profile-button"
        className={styles.profile}
        aria-controls={anchorEl ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AccountCircleIcon className={styles.icon} />
        <Box sx={{ width: '800px' }}>{data?.getUser.fullName || 'Profile'}</Box>
      </IconButton>
      <Menu
        id="profile-menu"
        aria-labelledby="profile-button"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        {!isAuth && <NotAuthPopup handleClose={handleClose} />}
        {isAuth && <AuthPopup handleClose={handleClose} />}
      </Menu>
    </>
  );
};

export default NavigationPopup;
