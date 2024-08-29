import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, InputBase } from '@mui/material';
import { styled } from '@mui/system';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '90%',
  height: '500px',
  overflow: 'hidden',
}));

const CarouselImage = styled('img')({
  margin:'10px',
  width: '100%',
  height: '100%',
  
  borderRadius:'10px'
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

const SearchInput = styled(InputBase)(({ theme }) => ({
  position: 'absolute',
  width:'50%',
  bottom: '-20px',
  right: '20px',
  padding: '5px 10px',
  backgroundColor: '#fff',
  borderRadius: '4px',
//   boxShadow: theme.shadows[2],
  zIndex: 2,
}));

const carouselItems = [
  {
    image: './hotela.jpg', // Replace with your image URLs
    text: 'Slide 1 Text',
  },{
    image: './hotela.jpg', // Replace with your image URLs
    text: 'Slide 1 Text',
  },
  {
    image: './hotela.jpg', // Replace with your image URLs
    text: 'Slide 1 Text',
  },
  
];

const Carousel = () => {
  const settings = {
    
  };

  return (
    <div style={{display:'flex',justifyContent:'center'}}>
    <CarouselContainer >
      <Slider {...settings}>
        {carouselItems.map((item, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <CarouselImage src={item.image} alt={`Slide ${index+1}`} />
            <CarouselText>{item.text}</CarouselText>
          </div>
        ))}
      </Slider>
      <SearchInput placeholder="Search..." />
    </CarouselContainer>
    </div>
  );
};

export default Carousel;
