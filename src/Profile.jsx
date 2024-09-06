


import React, { useState, useEffect } from 'react';
import {
  Avatar, Typography, Grid, Button, Card, CardMedia, CardContent, IconButton, Box, Container
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from './firebase';
import { signOut } from 'firebase/auth';
import { query, where, getDocs, collection } from 'firebase/firestore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { setFavorites, setBookings } from './BookingSlice';
import ButtonAppBar from './Navbar';

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [favorites, setFavoritesLocal] = useState([]);
  const [bookings, setBookingsLocal] = useState([]);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchProfileData(user.uid); // Pass the user's uid
    }
  }, [user]);

  const fetchProfileData = async (uid) => {
    try {
      // Fetch only the user's favorites from Firestore
      const favoritesQuery = query(
        collection(db, 'favorites'),
        where('userId', '==', uid)
      );
      const favoritesSnapshot = await getDocs(favoritesQuery);
      const favoritesList = favoritesSnapshot.docs.map(doc => doc.data());
      setFavoritesLocal(favoritesList);
      dispatch(setFavorites(favoritesList));

      // Fetch only the user's bookings from Firestore
      const bookingsQuery = query(
        collection(db, 'bookings'),
        where('userId', '==', uid)
      );
      const bookingsSnapshot = await getDocs(bookingsQuery);
      const bookingsList = bookingsSnapshot.docs.map(doc => doc.data());
      setBookingsLocal(bookingsList);
      dispatch(setBookings(bookingsList));

      // You can fetch the profile picture from Firestore or any other storage service
      const profilePicUrl = 'path/to/profilePicture.jpg'; // Placeholder URL
      setProfilePicture(profilePicUrl);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
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
    <Container>
      <ButtonAppBar />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Avatar
          src={profilePicture}
          alt="Profile Picture"
          sx={{ width: 150, height: 150 }}
        />
      </Box>
      <Typography variant="h6" align="center" gutterBottom>
        {user?.email}
      </Typography>

      {/* Favorites Section */}
      <Typography variant="h5" sx={{ mt: 4 }}>Favorites</Typography>
      <Grid container spacing={2}>
        {favorites.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card>
              <CardMedia component="img" height="140" image={room.image} alt={room.type} />
              <CardContent>
                <Typography variant="h6">{room.type} Room</Typography>
                <Typography>Price: R{room.price}</Typography>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Bookings Section */}
      <Typography variant="h5" sx={{ mt: 4 }}>Your Bookings</Typography>
      <Grid container spacing={2}>
        {bookings.map((booking) => (
          <Grid item xs={12} sm={6} md={4} key={booking.id}>
            <Card>
              <CardMedia component="img" height="140" image={booking.image} alt={booking.type} />
              <CardContent>
                <Typography variant="h6">{booking.type} Room</Typography>
                <Typography>Check-in: {new Date(booking.checkInDate).toLocaleDateString()}</Typography>
                <Typography>Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}</Typography>
                <Typography>Guests: {booking.guests}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Logout Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button variant="contained" color="error" startIcon={<LogoutIcon />} onClick={handleLogout}>
          Log Out
        </Button>
      </Box>
    </Container>
  );
};

export default Profile;
