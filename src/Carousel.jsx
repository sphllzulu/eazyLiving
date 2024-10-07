// import React, { useState, useEffect } from 'react';
// import { Box, Typography, useMediaQuery } from '@mui/material';
// import { styled } from '@mui/system';

// const Container = styled(Box)(({ theme, height }) => ({
//   position: 'relative',
//   width: '100%',
//   height: height,
//   overflow: 'hidden',
// }));

// const CarouselImage = styled('img')(({ fadeIn }) => ({
//   width: '100%',
//   height: '100vh',
//   objectFit: 'cover',
//   opacity: fadeIn ? 1 : 0,
//   transition: 'opacity 1s ease-in-out',
// }));

// const CarouselText = styled(Typography)(({ fadeIn, fontSize }) => ({
//   position: 'absolute',
//   top: '20%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   color: '#fff',
//   fontSize: fontSize,
//   fontWeight: 'bold',
//   opacity: fadeIn ? 1 : 0,
//   transition: 'opacity 1s ease-in-out',
//   textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
//   maxWidth: '80%',
//   textAlign: 'center',
// }));

// const CarouselOverlay = styled(Box)(({ fadeIn }) => ({
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
//   background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5))',
//   opacity: fadeIn ? 1 : 0,
//   transition: 'opacity 1s ease-in-out',
// }));

// const carouselItems = [
//   {
//     image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     text: 'Experience Ultimate Comfort at Eezy Living',
//   },
//   {
//     image: './hotel.jpg',
//     text: 'Unwind in Style at Eezy Living',
//   },
//   {
//     image: './hotela.jpg',
//     text: 'Discover Luxury and Relaxation at Eezy Living',
//   },
// ];

// const Carousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [fadeIn, setFadeIn] = useState(true);
  
//   // Media query for responsive text size and container height
//   const isSmallScreen = useMediaQuery('(max-width:600px)');
//   const textSize = isSmallScreen ? '1.5rem' : '2rem'; // Adjust font size based on screen width
//   const containerHeight = isSmallScreen ? '250px' : '500px'; // Adjust height for small screens

//   const nextImage = () => {
//     setFadeIn(false); // Trigger fade out

//     setTimeout(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
//       setFadeIn(true); // Trigger fade in after changing the image
//     }, 1000); // Matches the fade-out duration (1 second)
//   };

//   useEffect(() => {
//     const intervalId = setInterval(nextImage, 6000); // 6000ms = 6 seconds
//     return () => clearInterval(intervalId);
//   }, []);

//   const currentItem = carouselItems[currentIndex];

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center' }}>
//       <Container height={containerHeight}>
//         <div style={{ position: 'relative' }}>
//           <CarouselImage
//             src={currentItem.image}
//             alt={`Slide ${currentIndex + 1}`}
//             fadeIn={fadeIn}
//           />
//           <CarouselOverlay fadeIn={fadeIn} />
//           <CarouselText fadeIn={fadeIn} fontSize={textSize}>
//             {currentItem.text}
//           </CarouselText>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default Carousel;


// import React, { useState, useEffect } from 'react';
// import { Box, Typography, useMediaQuery, Button } from '@mui/material';
// import { styled } from '@mui/system';
// import { ChevronRight } from 'lucide-react';
// import {Link} from 'react-router-dom'
// const Container = styled(Box)(({ theme, height }) => ({
//   position: 'relative',
//   width: '100%',
//   height: height,
//   overflow: 'hidden',
// }));

// const CarouselImage = styled('img')(({ fadeIn }) => ({
//   width: '100%',
//   height: '100vh',
//   objectFit: 'cover',
//   opacity: fadeIn ? 1 : 0,
//   transition: 'opacity 1s ease-in-out',
// }));

// const CarouselText = styled(Typography)(({ fadeIn, fontSize }) => ({
//   position: 'absolute',
//   top: '15%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   color: '#fff',
//   fontSize: fontSize,
//   fontWeight: 'bold',
//   opacity: fadeIn ? 1 : 0,
//   transition: 'opacity 1s ease-in-out',
//   textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
//   maxWidth: '80%',
//   textAlign: 'center',
// }));

// const CarouselOverlay = styled(Box)(({ fadeIn }) => ({
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
//   background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5))',
//   opacity: fadeIn ? 1 : 0,
//   transition: 'opacity 1s ease-in-out',
// }));

// const GalleryButton = styled(Button)(({ theme, isSmallScreen }) => ({
//   position: 'absolute',
//   top: isSmallScreen ? '30%' : '30%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   color: '#fff',
//   background: 'rgba(255, 255, 255, 0.2)',
//   backdropFilter: 'blur(5px)',
//   border: '2px solid #fff',
//   borderRadius: isSmallScreen ? '20px' : '30px',
//   padding: isSmallScreen ? '8px 16px' : '10px 20px',
//   fontSize: isSmallScreen ? '0.875rem' : '1rem',
//   fontWeight: 'bold',
//   textTransform: 'none',
//   transition: 'all 0.3s ease-in-out',
//   '&:hover': {
//     background: 'rgba(255, 255, 255, 0.3)',
//     transform: `translate(-50%, -50%) scale(${isSmallScreen ? 1.03 : 1.05})`,
//     boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
//   },
//   '&:active': {
//     transform: 'translate(-50%, -50%) scale(0.95)',
//   },
// }));

// const carouselItems = [
//   {
//     image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     text: 'Experience Ultimate Comfort ',
//   },
//   {
//     image: './hotel.jpg',
//     text: 'Unwind in Style',
//   },
//   {
//     image: './hotela.jpg',
//     text: 'Discover Luxury and Relaxation',
//   },
// ];

// const Carousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [fadeIn, setFadeIn] = useState(true);
  
//   const isSmallScreen = useMediaQuery('(max-width:600px)');
//   const textSize = isSmallScreen ? '1.5rem' : '2rem';
//   const containerHeight = isSmallScreen ? '250px' : '500px';

//   const nextImage = () => {
//     setFadeIn(false);
//     setTimeout(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
//       setFadeIn(true);
//     }, 1000);
//   };

//   useEffect(() => {
//     const intervalId = setInterval(nextImage, 6000);
//     return () => clearInterval(intervalId);
//   }, []);

  

//   const currentItem = carouselItems[currentIndex];

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center' }}>
//       <Container height={containerHeight}>
//         <div style={{ position: 'relative' }}>
//           <CarouselImage
//             src={currentItem.image}
//             alt={`Slide ${currentIndex + 1}`}
//             fadeIn={fadeIn}
//           />
//           <CarouselOverlay fadeIn={fadeIn} />
//           <CarouselText fadeIn={fadeIn} fontSize={textSize}>
//             {currentItem.text}
//           </CarouselText>
//           <Link to='/gallery'>
//           <GalleryButton
//             variant="contained"
            
//             endIcon={<ChevronRight size={isSmallScreen ? 14 : 16} />}
//             isSmallScreen={isSmallScreen}
//           >
//             Explore Gallery
//           </GalleryButton>
//           </Link>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default Carousel;


import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { ChevronRight } from 'lucide-react';

const Container = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    height: '50vh',
  },
}));

const CarouselImage = styled('img')(({ fadeIn }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  opacity: fadeIn ? 1 : 0,
  transition: 'opacity 1s ease-in-out',
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  width: '80%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
  [theme.breakpoints.down('sm')]: {
    gap: '1rem',
  },
}));

const CarouselText = styled(Typography)(({ theme, fadeIn }) => ({
  color: '#fff',
  fontWeight: 'bold',
  opacity: fadeIn ? 1 : 0,
  transition: 'opacity 1s ease-in-out',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
  fontSize: '3rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.8rem',
  },
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

const GalleryButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(5px)',
  border: '2px solid #fff',
  borderRadius: '30px',
  padding: '10px 20px',
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'none',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.3)',
    transform: 'scale(1.05)',
    boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
    padding: '8px 16px',
    borderRadius: '20px',
  },
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
  const theme = useTheme();

  const nextImage = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
      setFadeIn(true);
    }, 1000);
  };

  useEffect(() => {
    const intervalId = setInterval(nextImage, 6000);
    return () => clearInterval(intervalId);
  }, []);

  const handleGalleryClick = () => {
    // Add your logic to navigate to the gallery section
    console.log("Navigating to gallery");
  };

  const currentItem = carouselItems[currentIndex];

  return (
    <Container>
      <CarouselImage
        src={currentItem.image}
        alt={`Slide ${currentIndex + 1}`}
        fadeIn={fadeIn}
      />
      <CarouselOverlay fadeIn={fadeIn} />
      <ContentWrapper>
        <CarouselText variant="h2" fadeIn={fadeIn}>
          {currentItem.text}
        </CarouselText>
        <GalleryButton
          variant="contained"
          onClick={handleGalleryClick}
          endIcon={<ChevronRight size={theme.breakpoints.down('sm') ? 14 : 16} />}
        >
          Explore Gallery
        </GalleryButton>
      </ContentWrapper>
    </Container>
  );
};

export default Carousel;