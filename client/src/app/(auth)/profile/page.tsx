'use client';
import React from 'react';
import useProfile from '@hooks/useProfile';
import { Box } from '@mui/material';
import ProfileSkeleton from './common/ProfileSkeleton';
import UserProfile from './components/UserProfile';
import UserDetails from './components/UserDetails';

const Profile = () => {
  const { data, loading } = useProfile();
  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <Box className="user-profile">
      <UserProfile user={data?.getUser} />
      <UserDetails />
    </Box>
  );
};

export default Profile;
