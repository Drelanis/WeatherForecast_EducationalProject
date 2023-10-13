'use client';
import React, { FC, useState } from 'react';
import AddCityButton from 'src/app/weather/components/AddCityButton';

interface IAddCityModalProps {
  handleOpenModal: () => void;
}

const AddCityCard: FC<IAddCityModalProps> = ({ handleOpenModal }) => {
  return <AddCityButton onClick={handleOpenModal} />;
};

export default AddCityCard;
