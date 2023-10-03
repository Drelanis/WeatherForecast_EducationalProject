import React, {
  MouseEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useRouter } from 'next/navigation';
import AuthPopup from './common/AuthPopup';
import NotAuthPopup from './common/NotAuthPopup';
import { MenuItem } from '@mui/material';
import { AuthContext } from '@context';

const NavigationPopup = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isAuth } = useContext(AuthContext);
  const router = useRouter();
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleTransition = (event?: MouseEvent) => {
    if (event) {
      const button = event.target as HTMLButtonElement;
      router.push(button.getAttribute('href')!);
    }
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
          onClick={(event) => handleTransition(event)}
        >
          Registration
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavigationPopup;
