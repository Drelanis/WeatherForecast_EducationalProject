import React, { FC, LabelHTMLAttributes } from 'react';
import styles from './index.module.scss';

interface IInputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const InputLabel: FC<IInputLabelProps> = ({ children, ...props }) => {
  return (
    <label className={styles.label} {...props}>
      {children}
    </label>
  );
};

export default InputLabel;
