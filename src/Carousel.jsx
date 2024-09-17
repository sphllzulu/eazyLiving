import React, { useState, useEffect } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '90%',
  // height: '500px',
  overflow: 'hidden', // Ensure that images don't overflow the container
}));

const CarouselImage = styled('img')(({ fadeIn }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '20px',
  objectFit: 'cover',
  opacity: fadeIn ? 1 : 0,
  transition: 'opacity 1s ease-in-out',
}));

const CarouselText = styled(Typography)(({ fadeIn, fontSize }) => ({
  position: 'absolute',
  top: '50%', // Center text vertically
  left: '50%', // Center text horizontally
  transform: 'translate(-50%, -50%)', // Adjust positioning to center
  color: '#fff',
  fontSize: fontSize,
  fontWeight: 'bold',
  opacity: fadeIn ? 1 : 0,
  transition: 'opacity 1s ease-in-out',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)', // Adding shadow for better readability
  maxWidth: '80%', // Ensure text does not overflow
  textAlign: 'center', // Center align text
}));

const CarouselOverlay = styled(Box)(({ fadeIn }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5))', // Gradient overlay for better text visibility
  opacity: fadeIn ? 1 : 0,
  transition: 'opacity 1s ease-in-out',
}));

// Carousel items
const carouselItems = [
  {
    image: './hotela.jpg',
    text: 'Experience Ultimate Comfort at Eezy Living',
  },
  {
    image: './hotel.jpg',
    text: 'Unwind in Style at Eezy Living',
  },
  {
    image: './hotela.jpg',
    text: 'Discover Luxury and Relaxation at Eezy Living',
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  
  // Media query for responsive text size
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const textSize = isSmallScreen ? '1.5rem' : '2rem'; // Adjust font size based on screen width

  // Function to handle the image change with fade effect
  const nextImage = () => {
    setFadeIn(false); // Trigger fade out

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
      setFadeIn(true); // Trigger fade in after changing the image
    }, 1000); // Matches the fade-out duration (1 second)
  };

  // Use useEffect to change the image every 6 seconds
  useEffect(() => {
    const intervalId = setInterval(nextImage, 6000); // 6000ms = 6 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const currentItem = carouselItems[currentIndex]; // Get the current item based on index

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Container>
        <div style={{ position: 'relative' }}>
          {/* Carousel Image with fade effect */}
          <CarouselImage
            src={currentItem.image}
            alt={`Slide ${currentIndex + 1}`}
            fadeIn={fadeIn}
          />

          {/* Gradient overlay for better text visibility */}
          <CarouselOverlay fadeIn={fadeIn} />

          {/* Carousel Text with fade effect */}
          <CarouselText fadeIn={fadeIn} fontSize={textSize}>
            {currentItem.text}
          </CarouselText>
        </div>
      </Container>
    </div>
  );
};

export default Carousel;
