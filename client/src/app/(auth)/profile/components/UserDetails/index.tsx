import { Box, Typography } from '@mui/material';
import React from 'react';
import styles from './index.module.scss';

const UserDetails = () => {
  return (
    <Box className={styles.details} sx={{ display: 'flex' }}>
      <Typography variant="h4" gutterBottom sx={{ margin: '0 auto 0 auto' }}>
        Details
      </Typography>
    </Box>
  );
};

export default UserDetails;
