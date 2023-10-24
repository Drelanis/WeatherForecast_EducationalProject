import React, { MouseEvent, useContext, useState } from 'react';
import Menu from '@mui/material/Menu';
import AuthPopup from './common/AuthPopup';
import NotAuthPopup from './common/NotAuthPopup';
import { AuthContext } from 'src/app/context';
import { Box, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './index.module.scss';
import useProfile from '@hooks/useProfile';
import CircularProgress from '@mui/material/CircularProgress';

const NavigationPopup = () => {
  const { data, loading } = useProfile();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isAuth } = useContext(AuthContext);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleTransition = () => {
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
        {
          <Box sx={{ width: '800px' }}>
            {data?.getUser.fullName || 'Profile'}
          </Box>
        }
      </IconButton>
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
        {isAuth ? <AuthPopup /> : <NotAuthPopup />}
      </Menu>
    </>
  );
};

export default NavigationPopup;
function handlePageRedirect() {
  throw new Error('Function not implemented.');
}
