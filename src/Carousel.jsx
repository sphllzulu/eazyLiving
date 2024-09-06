import React from 'react';
import { Box, Typography, InputBase, Button } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '90%',
  height: '400px',
 
}));

const CarouselImage = styled('img')({
  marginTop: '20px',
  width: '100%',
  height: '400px',
  borderRadius:'10px 10px 0 0',
  objectFit: 'cover',
});

const CarouselText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  bottom: '20px',
  left: '20px',
  color: '#fff',
  fontSize: '1.5rem',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: '10px',
  borderRadius: '5px',
  zIndex: 1,
}));

const SearchContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '90%',
  marginTop: '20px',
});

const SearchInput = styled(InputBase)({
  flex: 1,
  padding: '5px 10px',
  backgroundColor: '#fff',
  border: '2px solid black',
  borderRadius: '4px',
});

const carouselItems = [
  {
    image: './hotela.jpg',
    text: 'Slide 1 Text',
  },
];

const Carousel = () => {
  const item = carouselItems[0]; // Get the first item from the array

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Container>
        <div style={{ position: 'relative' }}>
          <CarouselImage src={item.image} alt="Slide 1" />
          <CarouselText>{item.text}</CarouselText>
        </div>
        
      </Container>
    </div>
  );
};

export default Carousel;
