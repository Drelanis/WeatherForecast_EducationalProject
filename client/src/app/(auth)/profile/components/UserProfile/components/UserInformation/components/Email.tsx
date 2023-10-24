import React, { FC } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import { Box, Grid } from '@mui/material';
import { IUserInformation } from '@lib/intarfaces';

interface IEmailProps {
  email: string | undefined;
}

const Email: FC<IEmailProps> = ({ email }) => {
  return (
    <Grid container sx={{ marginTop: '10px' }}>
      <MailIcon />
      <Box>{email}</Box>
    </Grid>
  );
};

export default Email;
