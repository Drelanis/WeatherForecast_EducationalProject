import React, { FC, HTMLAttributes } from 'react';
import LoupeIcon from '@mui/icons-material/Loupe';

interface AddCityButton extends HTMLAttributes<HTMLDivElement> {}

const AddCityButton: FC<AddCityButton> = ({ ...props }) => {
  return (
    <div className="add-citty-button" {...props}>
      <LoupeIcon className="add-citty-button__icon" />
    </div>
  );
};

export default AddCityButton;
