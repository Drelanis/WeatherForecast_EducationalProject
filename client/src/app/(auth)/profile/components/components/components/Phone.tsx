import React from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Box, Grid } from '@mui/material';

const Phone = () => {
  return (
    <Grid container sx={{ marginTop: '10px' }}>
      <LocalPhoneIcon />
      <Box>+380 ...</Box>
    </Grid>
  );
};

export default Phone;
