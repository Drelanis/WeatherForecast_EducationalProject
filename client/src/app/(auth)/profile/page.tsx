'use client';
import React, { useContext, useEffect } from 'react';
import useProfile from 'src/app/(auth)/profile/hooks/useProfile';
import { Box } from '@mui/material';
import ProfileSkeleton from './common/ProfileSkeleton';
import UserProfile from './components/UserProfile';
import UserDetails from './components/UserDetails';
import { PageLoadingContext } from '@context';
import styles from './index.module.scss';
import Loader from '@common/Loader';

const Profile = () => {
  const { data, loading } = useProfile();
  const { hideLoader } = useContext(PageLoadingContext);

  useEffect(() => {
    hideLoader();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box className={styles.profile}>
      <UserProfile user={data?.getUser} />
      <UserDetails />
    </Box>
  );
};

export default Profile;
