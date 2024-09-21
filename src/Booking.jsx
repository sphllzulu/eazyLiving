
import React, { useState, useEffect } from 'react';
import {
  Button, TextField, Card, CardContent, CardMedia, Typography, Grid, IconButton, Box, Dialog, DialogTitle, DialogContent, Container, InputLabel, MenuItem, Select
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
 import axios from 'axios'; 
import { useDispatch, useSelector } from 'react-redux';
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { db, auth } from "./firebase";
import { addBooking, addFavorite, setBookings, setFavorites, setCurrentBookingId } from './BookingSlice';
import { setCheckInDate, setCheckOutDate, setGuests, setAmount } from './paymentSlice';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { keyframes } from '@emotion/react';
import Footer from './Footer';
import Slide from '@mui/material/Slide';
import Star from '@mui/icons-material/Star';
import ReviewSection from './ReviewSection'
import StarBorder from '@mui/icons-material/StarBorder';
import UsersList from './ReviewSection';

// Define keyframes for the card animation
const cardHoverAnimation = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`;

const BookingComponent = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [open, setOpen] = useState(false);
  const [checkInDate, setCheckInDateLocal] = useState('');
  const [checkOutDate, setCheckOutDateLocal] = useState('');
  const [guests, setGuestsLocal] = useState(1);
  const [guestInfo, setGuestInfo] = useState({ name: '', surname: '', email: '', phone: '' });
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [confirmationDetails, setConfirmationDetails] = useState(null);
  const [favorites, setFavoritesState] = useState({}); // Track favorites
  const [searchKeyword, setSearchKeyword] = useState(''); // State for search input
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const stripe = useStripe();
  const elements = useElements();
  const CONFIG = {
    SERVER_URL: 'http://localhost:3000' 
  };
  
  useEffect(() => {
    const fetchRoomsFromFirestore = async () => {
      try {
        const roomsCollection = collection(db, 'accommodation');
        const roomSnapshot = await getDocs(roomsCollection);
        const roomList = roomSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
        setFilteredRooms(roomList);
        dispatch(setBookings(roomList));
      } catch (error) {
        console.error("Error fetching rooms from Firestore: ", error);
      }
    };

    fetchRoomsFromFirestore();
  }, [dispatch]);
   
  


  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchKeyword(keyword);
  
    const filtered = filteredRooms.filter(room => {
      // Ensure room.type and room.description are strings before calling toLowerCase
      const type = room.type ? room.type.toLowerCase() : '';
      const description = room.description ? room.description.toLowerCase() : '';
  
      return type.includes(keyword) || description.includes(keyword);
    });
  
    setFilteredRooms(filtered);
  };
  
  
  

  const handleOpen = (room) => {
    setSelectedRoom(room);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRoom(null);
    setCheckInDateLocal('');
    setCheckOutDateLocal('');
    setGuestsLocal(1);
    setGuestInfo({ name: '', surname: '', email: '', phone: '' });
  };

  const handleAddToFavorites = async (room) => {
    if (!user) {
      alert('You need to be logged in to add to favorites.');
      return;
    }

    try {
      const docRef = doc(db, 'favorites', `${room.id}-${user.uid}`);
      await setDoc(docRef, {
        ...room,
        userId: user.uid,
        addedAt: new Date(),
      });
      dispatch(addFavorite(room));
      setFavoritesState(prev => ({ ...prev, [room.id]: true })); // Update state
      alert('Room added to favorites!');
    } catch (error) {
      console.error("Error adding to favorites: ", error);
    }
  };

const handleShare = (room) => {
  // Prepare the share data
  const shareData = {
    title: `${room.type} Room`,
    text: `Check out this ${room.type} room priced at R${room.price} per night!`,
    url: window.location.href // URL of the current page
  };

  // Check if the browser supports the Share API
  if (navigator.share) {
    navigator.share(shareData)
      .then(() => {
        console.log('Successfully shared');
      })
      .catch((error) => {
        console.error('Error sharing:', error);
        alert('Failed to share. Please try copying the link manually.');
      });
  } else {
    // Fallback: Copy the URL to clipboard
    navigator.clipboard.writeText(shareData.url)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy the link:', error);
        alert('Failed to copy the link. Please copy it manually.');
      });
  }
};

// const handleBooking = async () => {
//   if (!user) {
//       alert('You need to be logged in to book a room.');
//       return;
//   }

//   // Check if the room is already booked by this user
//   const bookingsCollection = collection(db, 'bookings');
//   const bookingQuery = await getDocs(bookingsCollection);
//   const existingBooking = bookingQuery.docs.find(doc => {
//       const bookingData = doc.data();
//       return bookingData.userId === user.uid && bookingData.id === selectedRoom.id;
//   });

//   if (existingBooking) {
//       alert('You have already booked this room. Please check your bookings.');
//       return;
//   }

//   // Dispatch necessary details to Redux
//   dispatch(setAmount(selectedRoom.price));
//   dispatch(setCheckInDate(checkInDate));
//   dispatch(setCheckOutDate(checkOutDate));
//   dispatch(setGuests(guests));

//   // Create payment method with Stripe
//   const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//   });

//   if (error) {
//       console.error('Error creating payment method:', error);
//       alert('Payment failed');
//       return;
//   }

//   try {
//       const docRef = doc(db, 'bookings', `${selectedRoom.id}-${user.uid}`);
//       await setDoc(docRef, {
//           ...selectedRoom,
//           userId: user.uid,
//           checkInDate,
//           checkOutDate,
//           guests,
//           amount: selectedRoom.price,
//           bookedAt: new Date(),
//           paymentMethodId: paymentMethod.id,
//           guestInfo,
//           status: 'pending' 
//       });

//       // Dispatch booking to Redux store with status
//       dispatch(addBooking({
//           ...selectedRoom,
//           userId: user.uid,
//           checkInDate,
//           checkOutDate,
//           guests,
//           amount: selectedRoom.price,
//           guestInfo,
//           status: 'pending' 
//       }));

//       // Set the booking ID in Redux
//       dispatch(setCurrentBookingId(docRef.id));

//       // Retrieve booking details from Firestore and set confirmation details
//       const bookingSnapshot = await getDoc(docRef);
//       setConfirmationDetails(bookingSnapshot.data());

//       // Open confirmation modal and close booking form
//       setOpenConfirmation(true);
//       handleClose();

//       // Notify user via Formspree
//       await axios.post('https://formspree.io/f/meojwldj', {
//           name: guestInfo.name,
//           email: guestInfo.email,
//           subject: `Booking Confirmation for ${selectedRoom.type} Room`,
//           message: `Your booking for ${selectedRoom.type} from ${checkInDate} to ${checkOutDate} has been confirmed. Room Price: R${selectedRoom.price} per night.\n\nThank you for booking with us!`
//       }, {
//           headers: {
//               'Content-Type': 'application/json'
//           }
//       });

//       alert('Booking confirmed! A confirmation email has been sent to you.');
//   } catch (error) {
//       console.error('Error booking room:', error);
//       alert('Booking failed');
//   }
// };


 

// const handleBooking = async () => {
//     if (!user) {
//         alert('You need to be logged in to book a room.');
//         return;
//     }

//     // Dispatch necessary details to Redux
//     dispatch(setAmount(selectedRoom.price));
//     dispatch(setCheckInDate(checkInDate));
//     dispatch(setCheckOutDate(checkOutDate));
//     dispatch(setGuests(guests));

//     // Create payment method with Stripe
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//         type: 'card',
//         card: elements.getElement(CardElement),
//     });

//     if (error) {
//         console.error('Error creating payment method:', error);
//         alert('Payment failed');
//         return;
//     }

//     try {
//         const docRef = doc(db, 'bookings', `${selectedRoom.id}-${user.uid}`);
//         await setDoc(docRef, {
//             ...selectedRoom,
//             userId: user.uid,
//             checkInDate,
//             checkOutDate,
//             guests,
//             amount: selectedRoom.price,
//             bookedAt: new Date(),
//             paymentMethodId: paymentMethod.id,
//             guestInfo,
//             status: 'pending' 
//         });

//         // Dispatch booking to Redux store with status
//         dispatch(addBooking({
//             ...selectedRoom,
//             userId: user.uid,
//             checkInDate,
//             checkOutDate,
//             guests,
//             amount: selectedRoom.price,
//             guestInfo,
//             status: 'pending' 
//         }));

//         // Set the booking ID in Redux
//         dispatch(setCurrentBookingId(docRef.id));

//         // Retrieve booking details from Firestore and set confirmation details
//         const bookingSnapshot = await getDoc(docRef);
//         setConfirmationDetails(bookingSnapshot.data());

//         // Open confirmation modal and close booking form
//         setOpenConfirmation(true);
//         handleClose();

//         // Notify user via Formspree
//         await axios.post('https://formspree.io/f/meojwldj', {
//             name: guestInfo.name,
//             email: guestInfo.email,
//             subject: `Booking Confirmation for ${selectedRoom.type} Room`,
//             message: `Your booking for ${selectedRoom.type} from ${checkInDate} to ${checkOutDate} has been confirmed. Room Price: R${selectedRoom.price} per night.\n\nThank you for booking with us!`
//         }, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         alert('Booking confirmed! A confirmation email has been sent to you.');
//     } catch (error) {
//         console.error('Error booking room:', error);
//         alert('Booking failed');
//     }
// };


const handleBooking = async () => {
  if (!user) {
    alert('You need to be logged in to book a room.');
    return;
  }

  // Check if the room is already booked by this user
  const bookingsCollection = collection(db, 'bookings');
  const bookingQuery = await getDocs(bookingsCollection);
  const existingBooking = bookingQuery.docs.find(doc => {
    const bookingData = doc.data();
    return bookingData.userId === user.uid && bookingData.id === selectedRoom.id;
  });

  if (existingBooking) {
    alert('You have already booked this room. Please check your bookings.');
    return;
  }

  // Dispatch necessary details to Redux
  dispatch(setAmount(selectedRoom.price));
  dispatch(setCheckInDate(checkInDate));
  dispatch(setCheckOutDate(checkOutDate));
  dispatch(setGuests(guests));

  // Create payment method with Stripe
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: elements.getElement(CardElement),
  });

  if (error) {
    console.error('Error creating payment method:', error);
    alert('Payment failed');
    return;
  }

  try {
    const docRef = doc(db, 'bookings', `${selectedRoom.id}-${user.uid}`);
    await setDoc(docRef, {
      ...selectedRoom,
      userId: user.uid,
      checkInDate,
      checkOutDate,
      guests,
      amount: selectedRoom.price,
      bookedAt: new Date(),
      paymentMethodId: paymentMethod.id,
      guestInfo,
      status: 'pending' 
    });

    // Dispatch booking to Redux store with status
    dispatch(addBooking({
      ...selectedRoom,
      userId: user.uid,
      checkInDate,
      checkOutDate,
      guests,
      amount: selectedRoom.price,
      guestInfo,
      status: 'pending' 
    }));

    // Set the booking ID in Redux
    dispatch(setCurrentBookingId(docRef.id));

    // Retrieve booking details from Firestore and set confirmation details
    const bookingSnapshot = await getDoc(docRef);
    setConfirmationDetails(bookingSnapshot.data());

    // Open confirmation modal and close booking form
    setOpenConfirmation(true);
    handleClose();

    // Send confirmation email using Nodemailer (via server endpoint)
    const serverUrl = 'http://localhost:3000'; 
    await axios.post(`${serverUrl}/api/send-confirmation-email`, {
      to: guestInfo.email,
      subject: `Booking Confirmation for ${selectedRoom.type} Room`,
      text: `Dear ${guestInfo.name},\n\nYour booking for ${selectedRoom.type} from ${checkInDate} to ${checkOutDate} has been confirmed. Room Price: R${selectedRoom.price} per night.\n\nThank you for booking with us!`
    });

    alert('Booking confirmed! A confirmation email has been sent to you.');
  } catch (error) {
    console.error('Error booking room:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server responded with error:', error.response.data);
      alert(`Booking failed: ${error.response.data}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      alert('Booking failed: No response from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
      alert(`Booking failed: ${error.message}`);
    }
  }
};

  const handleGuestInfoChange = (e) => {
    setGuestInfo({ ...guestInfo, [e.target.name]: e.target.value });
  };

  const handleConfirmationClose = () => {
    setOpenConfirmation(false);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const dialogAnimation = '@keyframes dialogAnimation { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }';

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px 0' }}>
        <TextField
          variant="outlined"
          placeholder="Search for rooms..."
          onChange={handleSearch}
          sx={{ marginBottom: '20px', width: '80%', maxWidth: '600px' }}
        />
        <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button onClick={() => handleFilter('all')} variant="contained" sx={{ background: '#6a0dad' }}>All Rooms</Button>
          <Button onClick={() => handleFilter('standard')} variant="contained" sx={{ background: '#6a0dad' }}>Standard</Button>
          <Button onClick={() => handleFilter('suite')} variant="contained" sx={{ background: '#6a0dad' }}>Suite</Button>
          <Button onClick={() => handleFilter('double')} variant="contained" sx={{ background: '#6a0dad' }}>Double</Button>
          <Button onClick={() => handleFilter('queen')} variant="contained" sx={{ background: '#6a0dad' }}>Queen</Button>
          <Button onClick={() => handleFilter('king')} variant="contained" sx={{ background: '#6a0dad' }}>King</Button>
        </Box>
      </Box>
     {/* Card container */}

      <Container>
      <Grid container spacing={2}>
        {filteredRooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={room.id}>
            <Card
              sx={{
                '&:hover': {
                  animation: `${cardHoverAnimation} 0.3s ease-in-out`,
                  boxShadow: 3
                },
                transition: 'all 0.3s ease-in-out',
                backgroundColor: '#fff', // White background
                border: '2px solid purple', // Purple border
                borderRadius: '10px'
              }}
            >
              <CardMedia component="img" height="140" image={room.image} alt={room.type} />
              <CardContent>
                <Typography variant="h5" component="div">
                  {room.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  R{room.price} per night
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Array.from({ length: 5 }, (_, index) => (
                    index < room.rating ? <Star key={index} sx={{ fontSize: 16 }} /> : <StarBorder key={index} sx={{ fontSize: 16 }} />
                  ))}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                  <IconButton onClick={() => handleAddToFavorites(room)} sx={{ color: 'black' }}>
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleShare(room)} sx={{ color: 'black' }}>
                    <ShareIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpen(room)} sx={{ color: 'black' }}>
                    <VisibilityIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>

    {/* View more dialog */}
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          backgroundColor: 'black', // Black background
          color: 'white', // White text
          border: '2px solid purple', // Purple border
          borderRadius: '10px',
          animation: `${dialogAnimation} 0.4s ease-out`, // Animation
        },
      }}
    >
      <DialogTitle sx={{ position: 'relative', padding: '16px' }}>
        Book {selectedRoom?.type}
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: '16px' }}>
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <Typography variant="body1" paragraph>
          {selectedRoom?.description}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Amenities
        </Typography>
        <Typography variant="body1" paragraph>
  {selectedRoom?.amenities?.join(', ') || 'No amenities available'}
</Typography>
<Typography variant="h6" gutterBottom>
          Policies
        </Typography>
<Typography variant="body1" paragraph>
  {selectedRoom?.policies?.join(', ') || 'No policies available'}
</Typography>

        <Box sx={{ marginTop: '20px' }}>
          <InputLabel htmlFor="check-in-date" sx={{ color: 'white' }}>Check-In Date</InputLabel>
          <TextField
            id="check-in-date"
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDateLocal(e.target.value)}
            sx={{ width: '100%', marginBottom: '10px', input: { color: 'white' }, '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'purple' }, '&:hover fieldset': { borderColor: 'purple' }, } }}
          />
          <InputLabel htmlFor="check-out-date" sx={{ color: 'white' }}>Check-Out Date</InputLabel>
          <TextField
            id="check-out-date"
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDateLocal(e.target.value)}
            sx={{ width: '100%', marginBottom: '10px', input: { color: 'white' }, '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'purple' }, '&:hover fieldset': { borderColor: 'purple' }, } }}
          />
          <InputLabel htmlFor="guests" sx={{ color: 'white' }}>Number of Guests</InputLabel>
          <Select
            id="guests"
            value={guests}
            onChange={(e) => setGuestsLocal(e.target.value)}
            sx={{ width: '100%', marginBottom: '10px', input: { color: 'white' }, '& .MuiSelect-icon': { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'purple' }, '&:hover fieldset': { borderColor: 'purple' }, } }}
          >
            {[1, 2, 3, 4, 5].map(num => (
              <MenuItem key={num} value={num}>{num}</MenuItem>
            ))}
          </Select>
          <Typography variant="h6" gutterBottom>
            Guest Information
          </Typography>
          <TextField
            label="Name"
            name="name"
            value={guestInfo.name}
            onChange={handleGuestInfoChange}
            fullWidth
            sx={{ marginBottom: '10px', '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'purple' }, '&:hover fieldset': { borderColor: 'purple' }, } }}
          />
          <TextField
            label="Surname"
            name="surname"
            value={guestInfo.surname}
            onChange={handleGuestInfoChange}
            fullWidth
            sx={{ marginBottom: '10px', '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'purple' }, '&:hover fieldset': { borderColor: 'purple' }, } }}
          />
          <TextField
            label="Email Address"
            name="email"
            value={guestInfo.email}
            onChange={handleGuestInfoChange}
            fullWidth
            sx={{ marginBottom: '10px', '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'purple' }, '&:hover fieldset': { borderColor: 'purple' }, } }}
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={guestInfo.phone}
            onChange={handleGuestInfoChange}
            fullWidth
            sx={{ marginBottom: '10px', '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'purple' }, '&:hover fieldset': { borderColor: 'purple' }, } }}
          />
          <CardElement options={{ style: { base: { fontSize: '16px', color: 'white' } } }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleBooking} sx={{ backgroundColor: 'purple', '&:hover': { backgroundColor: '#6a1b9a' } }}>
              Book Now
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>

      {/* Booking confirmation */}
      <Dialog
      open={openConfirmation}
      onClose={handleConfirmationClose}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'black', // Black background
          color: 'white', // White text
          borderRadius: '10px',
          border: '2px solid purple', // Purple border
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
          animation: 'fadeIn 0.5s ease-in-out', // Animation
        },
      }}
    >
      <DialogTitle
        sx={{
          position: 'relative',
          borderBottom: '2px solid purple',
          padding: '16px',
          marginBottom: '8px',
          '& h2': {
            margin: 0,
          },
        }}
      >
        Booking Confirmation
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleConfirmationClose}
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          padding: '16px',
          '& h6': {
            marginBottom: '16px',
          },
          '& p': {
            margin: '8px 0',
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Booking Details
        </Typography>
        {confirmationDetails && (
          <Box>
            <Typography variant="body1" paragraph>
              <strong>Room Type:</strong> {confirmationDetails.type}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Check-In Date:</strong> {confirmationDetails.checkInDate}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Check-Out Date:</strong> {confirmationDetails.checkOutDate}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Number of Guests:</strong> {confirmationDetails.guests}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Total Amount:</strong> R{confirmationDetails.amount}
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
    <UsersList/>
      <Footer/>
    </div>
  );
};

export default BookingComponent;
