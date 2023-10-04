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
      {/* {cities.map((city) => (
        <CityCard key={city.id} info={city} />
      ))} */}
    </div>
  );
};

export default Weathers;
