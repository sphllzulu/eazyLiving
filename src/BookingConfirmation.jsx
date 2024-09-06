import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { resetBooking } from './BookingSlice';

const BookingConfirmation = ({ open, onClose }) => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const bookingId = useSelector((state) => state.bookings.currentBookingId);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!user || !bookingId) return;

      try {
        const docRef = doc(db, 'bookings', bookingId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBookingDetails(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    fetchBookingDetails();
  }, [user, bookingId]);

  const handleClose = () => {
    dispatch(resetBooking());
    onClose();
  };

  if (!bookingDetails) {
    return null; // Return null if booking details are not yet available
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Booking Confirmation</DialogTitle>
      <DialogContent>
        <Container>
          <Box mb={2}>
            <Typography variant="h6">Booking Details</Typography>
          </Box>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={bookingDetails.image}
              alt={bookingDetails.type}
            />
            <CardContent>
              <Typography variant="h5">{bookingDetails.type} Room</Typography>
              <Typography variant="body1">Price: R{bookingDetails.amount}</Typography>
              <Typography variant="body1">Check-in Date: {new Date(bookingDetails.checkInDate).toLocaleDateString()}</Typography>
              <Typography variant="body1">Check-out Date: {new Date(bookingDetails.checkOutDate).toLocaleDateString()}</Typography>
              <Typography variant="body1">Number of Guests: {bookingDetails.guests}</Typography>
              <Typography variant="body1">Name: {bookingDetails.guestInfo.name} {bookingDetails.guestInfo.surname}</Typography>
              <Typography variant="body1">Email: {bookingDetails.guestInfo.email}</Typography>
              <Typography variant="body1">Phone: {bookingDetails.guestInfo.phone}</Typography>
              <Typography variant="body2" mt={2}>Description: {bookingDetails.description}</Typography>
              <Typography variant="body2">Amenities: {bookingDetails.amenities.join(', ')}</Typography>
              <Typography variant="body2">Policies: {bookingDetails.policies.join(', ')}</Typography>
            </CardContent>
          </Card>
          <Box mt={2} sx={{ textAlign: 'right' }}>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default BookingConfirmation;
