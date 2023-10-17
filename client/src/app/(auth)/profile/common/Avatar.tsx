import React, { FC } from 'react';
import { blue } from '@mui/material/colors';
import { Avatar } from '@mui/material';

interface IAvatarProps {
  fullName: string | undefined;
}

const ProfileAvatar: FC<IAvatarProps> = ({ fullName }) => {
  return (
    <Avatar
      sx={{
        bgcolor: blue[500],
        width: '100px',
        height: '100px',
      }}
      alt={fullName || 'profile icon'}
    />
  );
};

export default ProfileAvatar;
