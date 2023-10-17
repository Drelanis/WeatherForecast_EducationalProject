import React, { MouseEvent, useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useRouter } from 'next/navigation';
import AuthPopup from './common/AuthPopup';
import NotAuthPopup from './common/NotAuthPopup';
import { MenuItem } from '@mui/material';
import { AuthContext } from '@context';
import useHandlePageRedirect from '@hooks/useHandlePageRedirect';

const NavigationPopup = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isAuth } = useContext(AuthContext);
  const { handlePageRedirect } = useHandlePageRedirect();
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleTransition = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="profile-button"
        aria-controls={anchorEl ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Profile
      </Button>
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
        <MenuItem
          href="/registration"
          onClick={() => handlePageRedirect('/registration')}
        >
          Registration
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavigationPopup;
function handlePageRedirect() {
  throw new Error('Function not implemented.');
}
