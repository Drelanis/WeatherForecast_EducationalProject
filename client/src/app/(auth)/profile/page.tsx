'use client';
import useProfile from '@hooks/useProfile';
import React from 'react';

const Profile = () => {
  const { data, loading, error } = useProfile();

  return (
    data && (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>{data.getUser.firstName}</span>
        <span>{data.getUser.lastName}</span>
        <span>{data.getUser.email}</span>
      </div>
    )
  );
};

export default Profile;
