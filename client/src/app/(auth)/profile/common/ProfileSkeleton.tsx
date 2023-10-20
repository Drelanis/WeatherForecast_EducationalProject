import { Box, Skeleton } from '@mui/material';
import React from 'react';

const ProfileSkeleton = () => {
  return (
    <>
      <Skeleton
        sx={{
          position: 'absolute',
          top: '-80px',
          left: '264px',
          width: '300px',
          height: '580px',
          borderRadius: '50px',
          marginRight: '40px',
          backgroundColor: 'rgb(121, 165, 255, 0.7)',
        }}
      />
      <Skeleton
        sx={{
          position: 'absolute',
          top: '-80px',
          left: '604px',
          width: '450px',
          height: '580px',
          borderRadius: '50px',
          marginRight: '40px',
          backgroundColor: 'rgb(121, 165, 255, 0.7)',
        }}
      />
    </>
  );
};

export default ProfileSkeleton;
