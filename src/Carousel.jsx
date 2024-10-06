import React, { useState, useEffect } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled(Box)(({ theme, height }) => ({
  position: 'relative',
  width: '100%',
  height: height,
  overflow: 'hidden',
}));

const CarouselImage = styled('img')(({ fadeIn }) => ({
  width: '100%',
  height: '100vh',
  objectFit: 'cover',
  opacity: fadeIn ? 1 : 0,
  transition: 'opacity 1s ease-in-out',
}));

const CarouselText = styled(Typography)(({ fadeIn, fontSize }) => ({
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: '#fff',
  fontSize: fontSize,
  fontWeight: 'bold',
  opacity: fadeIn ? 1 : 0,
  transition: 'opacity 1s ease-in-out',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
  maxWidth: '80%',
  textAlign: 'center',
}));

const CarouselOverlay = styled(Box)(({ fadeIn }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5))',
  opacity: fadeIn ? 1 : 0,
  transition: 'opacity 1s ease-in-out',
}));

const carouselItems = [
  {
    image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
  
  // Media query for responsive text size and container height
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const textSize = isSmallScreen ? '1.5rem' : '2rem'; // Adjust font size based on screen width
  const containerHeight = isSmallScreen ? '250px' : '500px'; // Adjust height for small screens

  const nextImage = () => {
    setFadeIn(false); // Trigger fade out

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
      setFadeIn(true); // Trigger fade in after changing the image
    }, 1000); // Matches the fade-out duration (1 second)
  };

  useEffect(() => {
    const intervalId = setInterval(nextImage, 6000); // 6000ms = 6 seconds
    return () => clearInterval(intervalId);
  }, []);

  const currentItem = carouselItems[currentIndex];

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Container height={containerHeight}>
        <div style={{ position: 'relative' }}>
          <CarouselImage
            src={currentItem.image}
            alt={`Slide ${currentIndex + 1}`}
            fadeIn={fadeIn}
          />
          <CarouselOverlay fadeIn={fadeIn} />
          <CarouselText fadeIn={fadeIn} fontSize={textSize}>
            {currentItem.text}
          </CarouselText>
        </div>
      </Container>
    </div>
  );
};

export default Carousel;
