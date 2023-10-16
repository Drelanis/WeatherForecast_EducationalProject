'use client';
import useProfile from '@hooks/useProfile';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ProfileSkeleton from './components/ProfileSkeleton';

const Profile = () => {
  const { data, loading } = useProfile();

  if (loading) {
    <ProfileSkeleton />;
  }

  return (
    <Box className="user-profile">
      <Box className="user-profile__info" sx={{ padding: '20px' }}>
        <Avatar
          sx={{
            bgcolor: blue[500],
            width: '100px',
            height: '100px',
          }}
          alt={data?.getUser.fullName || 'profile icon'}
        />
        <Grid container sx={{ marginTop: '10px' }}>
          <Typography>{data?.getUser.fullName}</Typography>
          <Grid container sx={{ marginTop: '10px' }}>
            <MailIcon />
            <Typography>{data?.getUser.email}</Typography>
          </Grid>
          <Grid container sx={{ marginTop: '10px' }}>
            <LocalPhoneIcon />
            <Typography>+380 ...</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box className="user-profile__details" sx={{ display: 'flex' }}>
        <Typography variant="h4" gutterBottom sx={{ margin: '0 auto 0 auto' }}>
          Details
        </Typography>
      </Box>
    </Box>
  );
};

export default Profile;
