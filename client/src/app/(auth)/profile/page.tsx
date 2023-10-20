'use client';
import React, { useContext, useEffect } from 'react';
import useProfile from '@hooks/useProfile';
import { Box } from '@mui/material';
import ProfileSkeleton from './common/ProfileSkeleton';
import UserProfile from './components/UserProfile';
import UserDetails from './components/UserDetails';
import { PageLoadingContext } from '@context';

const Profile = () => {
  const { data, loading } = useProfile();
  const { hideLoader } = useContext(PageLoadingContext);

  useEffect(() => {
    hideLoader();
  }, []);

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
