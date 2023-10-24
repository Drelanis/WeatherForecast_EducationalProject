import { Box } from '@mui/material';
import React, { FC } from 'react';
import styles from './index.module.scss';

interface IInputErrorProps {
  children: React.ReactNode;
}

const InputError: FC<IInputErrorProps> = ({ children }) => {
  return <Box className={styles.error}>{children}</Box>;
};

export default InputError;
