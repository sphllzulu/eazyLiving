import React, { useState, useEffect } from 'react';
import {
  Avatar, Typography, Grid, Button, Card, CardMedia, CardContent, IconButton, Box, Container,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db,storage} from './firebase';
import { signOut } from 'firebase/auth';
// import { query, where, getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { setFavorites, setBookings } from './BookingSlice';
import ButtonAppBar from './Navbar';
import { motion } from 'framer-motion';


import { query, where, getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [favorites, setFavoritesLocal] = useState([]);
  const [bookings, setBookingsLocal] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchProfileData(user.uid);
      loadProfilePicture(user.uid);
    }
  }, [user]);

  const fetchProfileData = async (uid) => {
    try {
      const favoritesQuery = query(
        collection(db, 'favorites'),
        where('userId', '==', uid)
      );
      const favoritesSnapshot = await getDocs(favoritesQuery);
      const favoritesList = favoritesSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setFavoritesLocal(favoritesList);
      dispatch(setFavorites(favoritesList));

      const bookingsQuery = query(
        collection(db, 'bookings'),
        where('userId', '==', uid)
      );
      const bookingsSnapshot = await getDocs(bookingsQuery);
      const bookingsList = bookingsSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setBookingsLocal(bookingsList);
      dispatch(setBookings(bookingsList));
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const loadProfilePicture = async (uid) => {
    try {
      const imageRef = ref(storage, `profilePictures/${uid}`);
      const url = await getDownloadURL(imageRef);
      setProfilePicture(url);
    } catch (error) {
      console.error('Error loading profile picture:', error);
    }
  };

  const handleUploadProfilePicture = async (e) => {
    const file = e.target.files[0];
    if (file && user) {
      try {
        const imageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        setProfilePicture(url);

        // Update user document with profile picture URL
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { profilePicture: url });
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  const handleRemoveProfilePicture = async () => {
    if (user) {
      try {
        const imageRef = ref(storage, `profilePictures/${user.uid}`);
        await deleteObject(imageRef);
        setProfilePicture(null);

        // Update user document to remove profile picture URL
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { profilePicture: null });
      } catch (error) {
        console.error('Error removing profile picture:', error);
      }
    }
  };

  const handleFavoriteRemove = async (roomId) => {
    try {
      await deleteDoc(doc(db, 'favorites', roomId));
      setFavoritesLocal(favorites.filter(fav => fav.id !== roomId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setOpenDialog(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
       <ButtonAppBar />
    <Container sx={{ bgcolor: '#f3f4f6', py: 2 }}>
     
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 0.5 }}>
            <Avatar
              src={profilePicture}
              alt="Profile Picture"
              sx={{ width: 180, height: 180, border: '5px solid #d4af37', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
            />
          </motion.div>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="profile-picture-upload"
            type="file"
            onChange={handleUploadProfilePicture}
          />
          <label htmlFor="profile-picture-upload">
            <Button variant="contained" color="secondary" component="span" sx={{ mr: 2 }}>
              Upload Profile Picture
            </Button>
          </label>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleRemoveProfilePicture}
            disabled={!profilePicture}
          >
            Remove Picture
          </Button>
        </Box>

        <Typography variant="h6" align="center" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
          {user?.email}
        </Typography>

      <Typography variant="h5" align="left" sx={{ mt: 4, color: 'black', fontWeight: 600 }}>
        Favorites
      </Typography>
      <Grid container spacing={3}>
        {favorites.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ backgroundColor: '#fff', border: '2px solid #d4af37', borderRadius: 2 }}>
                <CardMedia component="img" height="160" image={room.image} alt={room.type} />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{room.type} Room</Typography>
                  <Typography>Price: R{room.price}</Typography>
                  <IconButton onClick={() => handleFavoriteRemove(room.id)}>
                    <FavoriteIcon color="error" />
                  </IconButton>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
{/* below is where user will see a list of cards with their bookings */}
      <Typography variant="h5" align="left" sx={{ mt: 4, color: 'black', fontWeight: 600 }}>
        Your Bookings
      </Typography>
      <Grid container spacing={3}>
        {bookings.map((booking) => (
          <Grid item xs={12} sm={6} md={4} key={booking.id}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ backgroundColor: '#fff', border: '2px solid #d4af37', borderRadius: 2 }} onClick={() => handleBookingClick(booking)}>
                <CardMedia component="img" height="160" image={booking.image} alt={booking.type} />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{booking.type} Room</Typography>
                  <Typography>Check-in: {new Date(booking.checkInDate).toLocaleDateString()}</Typography>
                  <Typography>Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}</Typography>
                  <Typography>Guests: {booking.guests}</Typography>
                  <Typography>Status: {booking.status}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

{/* thie dialog will appear when user clicks on the card to view their booking */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}  sx={{border:'2px solid purple'}}>
        <DialogTitle>Booking Details</DialogTitle>
        {selectedBooking && (
          <DialogContent>
            <img
        src={selectedBooking?.image || '/default-room.jpg'} // Use room image or a default one
        alt={selectedBooking?.type}
        style={{
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '10px',
          border: '2px solid purple', // Purple border for the image
        }}
      />
            <Typography>Room Type: {selectedBooking.type}</Typography>
            <Typography>Price: R{selectedBooking.price}</Typography>
            <Typography>Check-in: {new Date(selectedBooking.checkInDate).toLocaleDateString()}</Typography>
            <Typography>Check-out: {new Date(selectedBooking.checkOutDate).toLocaleDateString()}</Typography>
            <Typography>Guests: {selectedBooking.guests}</Typography>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="purple">Close</Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button variant="contained" color="error" sx={{backgroundColor:'black'}} startIcon={<LogoutIcon />} onClick={handleLogout}>
          Log Out
        </Button>
      </Box>
    </Container>
    </div>
  );
};

export default Profile;
