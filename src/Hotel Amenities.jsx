// src/components/HotelAmenities.jsx

import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import SpaIcon from '@mui/icons-material/Spa';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';

const HotelAmenities = () => {
  const amenities = [
    { name: 'Free Wi-Fi', icon: <WifiIcon /> },
    { name: 'Swimming Pool', icon: <PoolIcon /> },
    { name: 'Restaurant', icon: <RestaurantIcon /> },
    { name: 'Fitness Center', icon: <FitnessCenterIcon /> },
    { name: 'Free Parking', icon: <LocalParkingIcon /> },
    { name: 'Spa', icon: <SpaIcon /> },
    { name: 'Room Service', icon: <RoomServiceIcon /> },
    { name: 'Air Conditioning', icon: <AcUnitIcon /> },
    { name: 'Laundry Service', icon: <LocalLaundryServiceIcon /> },
  ];

  return (
    <Box
      sx={{
        // border: '2px solid black',
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '8px',
        width: '90%',
        margin: ' 20px auto',
      }}
    >
      <Typography variant="h6" gutterBottom textAlign="center">
        Hotel Amenities
      </Typography>
      <Grid container spacing={2}>
        {amenities.map((amenity, index) => (
          <Grid item xs={4} key={index} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box sx={{ color: 'black', fontSize: 40 }}>{amenity.icon}</Box>
              <Typography variant="body1" sx={{ color: 'black' }}>
                {amenity.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HotelAmenities;
