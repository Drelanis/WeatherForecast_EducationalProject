'use client';
import React, { useState } from 'react';
import CityModal from 'src/app/weather/components/CityModal';

const Weathers = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="weather-container">
      <CityModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Weathers;
