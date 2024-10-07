

import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardMedia, Modal, IconButton } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';  // Make sure this is correctly configured
import CloseIcon from '@mui/icons-material/Close';
import ButtonAppBar from './Navbar';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const imagesCollection = collection(db, 'images');
      const snapshot = await getDocs(imagesCollection);
      const imageList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setImages(imageList);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
        <ButtonAppBar/>
    <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: 2 }}>
      <Grid container spacing={2}>
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <Card 
              sx={{ 
                '&:hover': { 
                  transform: 'scale(1.1)', 
                  transition: 'transform 0.3s' 
                } 
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={image.url}
                alt={image.name}
                sx={{ cursor: 'pointer', border: '2px solid purple' }}
                onClick={() => handleImageClick(image)}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={!!selectedImage}
        onClose={handleCloseModal}
        aria-labelledby="image-modal"
        aria-describedby="full-size-image"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          outline: 'none',
          maxWidth: '90vw',
          maxHeight: '90vh',
        }}>
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
            />
          )}
        </Box>
      </Modal>
    </Box>
    </div>
  );
};

export default Gallery;
