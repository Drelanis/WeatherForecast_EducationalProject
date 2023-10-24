import { Box } from '@mui/material';
import React, { FC } from 'react';
import styles from './index.module.scss';

interface IFormItemProps {
  children: React.ReactNode;
}

const FormItem: FC<IFormItemProps> = ({ children }) => {
  return <Box className={styles.item}>{children}</Box>;
};

export default FormItem;
