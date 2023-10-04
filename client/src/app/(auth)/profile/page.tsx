'use client';
import useProfile from '@hooks/useProfile';
import React from 'react';

const Profile = () => {
  const { data, loading, error } = useProfile();

  return (
    data && (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>{data.getUser.fullName}</span>
        <span>{data.getUser.email}</span>
      </div>
    )
  );
};

export default Profile;
