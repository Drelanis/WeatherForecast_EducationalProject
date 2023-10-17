import { Box, Skeleton } from '@mui/material';
import React from 'react';

const ProfileSkeleton = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Skeleton
        sx={{
          width: '300px',
          height: '350px',
          borderRadius: '40px',
          marginRight: '40px',
          backgroundColor: 'rgb(121, 165, 255, 0.7)',
        }}
      />
      <Skeleton
        sx={{
          width: '450px',
          height: '350px',
          borderRadius: '40px',
          marginRight: '40px',
          backgroundColor: 'rgb(121, 165, 255, 0.7)',
        }}
      />
    </Box>
  );
};

export default ProfileSkeleton;
