import handleDataTime from '@lib/helpers/handleDataTime';
import { Box } from '@mui/material';
import React, { FC } from 'react';
import UpdateIcon from '@mui/icons-material/Update';

interface IUpdatedAtProps {
  updatedAt: string;
}

const UpdatedAt: FC<IUpdatedAtProps> = ({ updatedAt }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <UpdateIcon />
      <Box>{handleDataTime(updatedAt)}</Box>
    </Box>
  );
};

export default UpdatedAt;
