import React, { FC } from 'react';
import { Box } from '@mui/material';

interface IUserInformationProps {
  fullName: string | undefined;
}

const FullName: FC<IUserInformationProps> = ({ fullName }) => {
  return <Box>{fullName}</Box>;
};

export default FullName;
