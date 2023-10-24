import { Box } from '@mui/material';
import React, { FC } from 'react';
import ProfileAvatar from '../../common/Avatar';
import UserInformation from './components/UserInformation';
import { IUserInformation } from '@lib/intarfaces';
import styles from './index.module.scss';

interface IUserProfileProps {
  user: IUserInformation | undefined;
}

const UserProfile: FC<IUserProfileProps> = ({ user }) => {
  return (
    <Box className={styles.data} sx={{ padding: '20px' }}>
      <ProfileAvatar fullName={user?.fullName} />
      <UserInformation user={user} />
    </Box>
  );
};

export default UserProfile;
