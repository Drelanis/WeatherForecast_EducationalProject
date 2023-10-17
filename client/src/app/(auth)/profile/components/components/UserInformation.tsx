import { Box, Grid } from '@mui/material';
import React, { FC } from 'react';
import { IUserInformation } from '@lib/intarfaces';
import Email from './components/Email';
import Phone from './components/Phone';
import FullName from './components/FullName';

interface IUserInformationProps {
  user: IUserInformation | undefined;
}

const UserInformation: FC<IUserInformationProps> = ({ user }) => {
  return (
    <Grid container sx={{ marginTop: '10px' }}>
      <FullName fullName={user?.fullName} />
      <Email email={user?.email} />
      <Phone />
    </Grid>
  );
};

export default UserInformation;
