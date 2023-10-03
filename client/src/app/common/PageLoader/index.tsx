import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const PageLoader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <CircularProgress style={{ height: '200px', width: '200px' }} />
    </Box>
  );
};

export default PageLoader;
