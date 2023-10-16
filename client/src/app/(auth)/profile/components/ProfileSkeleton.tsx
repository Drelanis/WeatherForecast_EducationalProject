import { Container, Skeleton } from '@mui/material';
import React from 'react';

const ProfileSkeleton = () => {
  return (
    <Container
      sx={{ display: 'flex', justifyContent: 'center', height: '350px' }}
    >
      <Skeleton
        sx={{
          width: '300px',
          height: '350px',
          borderRadius: '40px',
          marginRight: '40px',
          backgroundColor: 'rgb(121, 165, 255, 40%)',
        }}
        animation="wave"
      ></Skeleton>
      <Skeleton
        sx={{
          width: '450px',
          height: '350px',
          borderRadius: '40px',
          marginRight: '40px',
          backgroundColor: 'rgb(121, 165, 255, 40%)',
        }}
        animation="wave"
      />
    </Container>
  );
};

export default ProfileSkeleton;
