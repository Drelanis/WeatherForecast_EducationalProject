import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Loader = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress
        style={{
          width: '100px',
          height: '100px',
          margin: '0 auto',
        }}
      />
    </Box>
  );
};

export default Loader;
