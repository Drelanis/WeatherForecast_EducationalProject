import { Box } from '@mui/material';
import React, { FC } from 'react';
import ProfileAvatar from '../common/Avatar';
import UserInformation from './components/UserInformation';
import { IUserInformation } from '@lib/intarfaces';

interface IUserProfileProps {
  user: IUserInformation | undefined;
}

const UserProfile: FC<IUserProfileProps> = ({ user }) => {
  return (
    <Box className="user-profile__info" sx={{ padding: '20px' }}>
      <ProfileAvatar fullName={user?.fullName} />
      <UserInformation user={user} />
    </Box>
  );
};

export default UserProfile;
