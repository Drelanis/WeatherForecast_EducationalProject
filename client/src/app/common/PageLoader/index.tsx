import { PageLoadingContext } from '@context';
import { Backdrop, CircularProgress } from '@mui/material';
import React, { useContext } from 'react';

const PageLoader = () => {
  const { isLoading } = useContext(PageLoadingContext);
  if (!isLoading) {
    return null;
  }
  return (
    <Backdrop
      sx={{
        position: 'absolute',
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default PageLoader;
