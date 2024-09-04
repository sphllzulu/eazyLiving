// import React, { useState, useEffect } from 'react';
// import {
//   Button, TextField, Card, CardContent, CardMedia, Typography, Grid, IconButton, Box, Dialog, DialogTitle, DialogContent, Container
// } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import ShareIcon from '@mui/icons-material/Share';
// import CloseIcon from '@mui/icons-material/Close';
// import { useDispatch, useSelector } from 'react-redux';
// import { doc, setDoc } from "firebase/firestore";
// import { db, auth } from "./firebase";
// import { addBooking, addFavorite, setBookings, setFavorites } from './BookingSlice';
// import { setCheckInDate, setCheckOutDate, setGuests, setAmount } from './paymentSlice';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// const roomsData = [
//   { id: 1, type: 'standard', price: 1000, image: 'standard.jpg', rating: 4.5, amenities: ['Free WiFi', 'TV'], policies: ['No Smoking', 'No Pets'], description: 'A cozy standard room.' },
//   { id: 2, type: 'suite', price: 2000, image: 'suite.jpg', rating: 4.8, amenities: ['Free WiFi', 'TV', 'Mini Bar'], policies: ['No Smoking', 'No Pets'], description: 'A luxurious suite with extra space.' },
  
//   {
//     id: 3,
//     type: 'double',
//     price: 1500,
//     image: 'double.jpg',
//     rating: 4.6,
//     amenities: ['Free WiFi', 'TV', 'Air Conditioning', 'Tea/Coffee Maker'],
//     policies: ['No Smoking', 'No Pets', 'Check-in after 3 PM', 'Check-out before 11 AM'],
//     description: 'A spacious double room with comfortable beds and modern amenities for a relaxing stay.'
//   },
//   {
//     id: 4,
//     type: 'queen',
//     price: 1800,
//     image: 'queen.jpg',
//     rating: 4.7,
//     amenities: ['Free WiFi', 'TV', 'Mini Bar', 'Work Desk'],
//     policies: ['No Smoking', 'No Pets', 'Check-in after 3 PM', 'Check-out before 11 AM'],
//     description: 'A stylish queen room with elegant decor, a mini bar, and a dedicated workspace.'
//   },
//   {
//     id: 5,
//     type: 'king',
//     price: 2500,
//     image: 'king.jpg',
//     rating: 4.9,
//     amenities: ['Free WiFi', 'TV', 'Private Balcony', 'Jacuzzi', 'Mini Bar'],
//     policies: ['No Smoking', 'No Pets', 'Check-in after 2 PM', 'Check-out before 12 PM'],
//     description: 'An opulent king room with a private balcony, a Jacuzzi, and premium amenities for the ultimate experience.'
//   }
// ];

// const BookingComponent = () => {
//   const [selectedType, setSelectedType] = useState('all');
//   const [filteredRooms, setFilteredRooms] = useState(roomsData);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [checkInDate, setCheckInDateLocal] = useState(null);
//   const [checkOutDate, setCheckOutDateLocal] = useState(null);
//   const [guests, setGuestsLocal] = useState(1);
//   const [guestInfo, setGuestInfo] = useState({ name: '', surname: '', email: '', phone: '' });
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.user);
//   const stripe = useStripe();
//   const elements = useElements();

//   useEffect(() => {
//     dispatch(setBookings(roomsData));
//     dispatch(setFavorites([]));
//   }, [dispatch]);

//   const handleFilter = (type) => {
//     setSelectedType(type);
//     if (type === 'all') {
//       setFilteredRooms(roomsData);
//     } else {
//       setFilteredRooms(roomsData.filter(room => room.type === type));
//     }
//   };

//   const handleOpen = (room) => {
//     setSelectedRoom(room);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedRoom(null);
//   };

//   const handleAddToFavorites = async (room) => {
//     if (!user) {
//       alert('You need to be logged in to add to favorites.');
//       return;
//     }

//     try {
//       const docRef = doc(db, 'favorites', room.id.toString());
//       await setDoc(docRef, {
//         ...room,
//         userId: user.uid,
//         addedAt: new Date(),
//       });
//       dispatch(addFavorite(room));
//     } catch (error) {
//       console.error("Error adding to favorites: ", error);
//     }
//   };

//   const handleShare = (room) => {
//     if (navigator.share) {
//       navigator.share({
//         title: `${room.type} Room`,
//         text: `Check out this ${room.type} room priced at R${room.price} per night!`,
//         url: window.location.href,
//       });
//     } else {
//       alert('Your browser does not support the Share API');
//     }
//   };

//   const handleBooking = async () => {
//     if (!user) {
//       alert('You need to be logged in to book a room.');
//       return;
//     }

//     dispatch(setAmount(selectedRoom.price));
//     dispatch(setCheckInDate(checkInDate ? checkInDate.toISOString() : null));
//     dispatch(setCheckOutDate(checkOutDate ? checkOutDate.toISOString() : null));
//     dispatch(setGuests(guests));

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//     });

//     if (error) {
//       console.error('Error creating payment method:', error);
//       alert('Payment failed');
//       return;
//     }

//     try {
//       await setDoc(doc(db, 'bookings', `${selectedRoom.id}-${user.uid}`), {
//         ...selectedRoom,
//         userId: user.uid,
//         checkInDate: checkInDate ? checkInDate.toISOString() : null,
//         checkOutDate: checkOutDate ? checkOutDate.toISOString() : null,
//         guests,
//         amount: selectedRoom.price,
//         bookedAt: new Date(),
//         paymentMethodId: paymentMethod.id,
//         guestInfo
//       });
//       dispatch(addBooking({
//         ...selectedRoom,
//         userId: user.uid,
//         checkInDate: checkInDate ? checkInDate.toISOString() : null,
//         checkOutDate: checkOutDate ? checkOutDate.toISOString() : null,
//         guests,
//         amount: selectedRoom.price,
//         guestInfo
//       }));
//       alert('Room booked successfully');
//       handleClose();
//     } catch (error) {
//       console.error('Error booking room:', error);
//       alert('Booking failed');
//     }
//   };

//   const handleGuestInfoChange = (e) => {
//     setGuestInfo({ ...guestInfo, [e.target.name]: e.target.value });
//   };

//   return (
//     <div>
//       <Box sx={{ display: 'flex', justifyContent: 'center', margin: '40px 0', overflowX: 'auto', width: '100%', padding: '10px' }}>
//         <Box sx={{ display: 'flex', gap: '10px' }}>
//           <Button onClick={() => handleFilter('all')} variant="contained">All Rooms</Button>
//           <Button onClick={() => handleFilter('standard')} variant="contained">Standard</Button>
//           <Button onClick={() => handleFilter('suite')} variant="contained">Suite</Button>
//           <Button onClick={() => handleFilter('double')} variant="contained">Double</Button>
//           <Button onClick={() => handleFilter('queen')} variant="contained">Queen</Button>
//           <Button onClick={() => handleFilter('king')} variant="contained">King</Button>
//         </Box>
//       </Box>
//       <Container>
//         <Grid container spacing={2}>
//           {filteredRooms.map((room) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={room.id}>
//               <Card>
//                 <CardMedia component="img" height="140" image={room.image} alt={room.type} />
//                 <CardContent>
//                   <Typography variant="h5" component="div">
//                     {room.type}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     R{room.price} per night
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Rating: {room.rating} stars
//                   </Typography>
//                 </CardContent>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '8px' }}>
//                   <IconButton onClick={() => handleAddToFavorites(room)} aria-label="add to favorites">
//                     <FavoriteIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleOpen(room)} aria-label="view more">
//                     <VisibilityIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleShare(room)} aria-label="share">
//                     <ShareIcon />
//                   </IconButton>
//                 </Box>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//       {selectedRoom && (
//         <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { width: '600px', maxHeight: '80vh', animation: 'fadeIn 0.5s ease' } }}>
//           <DialogTitle>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Typography>Book Room</Typography>
//               <IconButton onClick={handleClose}>
//                 <CloseIcon />
//               </IconButton>
//             </Box>
//           </DialogTitle>
//           <DialogContent dividers sx={{ maxHeight: 'calc(100% - 96px)', overflowY: 'auto', scrollbarWidth: 'thin', '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '10px' }, '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' } }}>
//             <Box sx={{ marginBottom: 2 }}>
//               <Typography variant="h6">{selectedRoom.type}</Typography>
//               <Typography variant="body1">Price: R{selectedRoom.price} per night</Typography>
//               <Typography variant="body1">Rating: {selectedRoom.rating} stars</Typography>
//               <Typography variant="body1">Amenities:</Typography>
//               <ul>
//                 {selectedRoom.amenities.map((amenity, index) => (
//                   <li key={index}>{amenity}</li>
//                 ))}
//               </ul>
//               <Typography variant="body1">Policies:</Typography>
//               <ul>
//                 {selectedRoom.policies.map((policy, index) => (
//                   <li key={index}>{policy}</li>
//                 ))}
//               </ul>
//               <Typography variant="body1">Description:</Typography>
//               <Typography variant="body2" paragraph>{selectedRoom.description}</Typography>
//               <CardMedia component="img" height="200" image={selectedRoom.image} alt={selectedRoom.type} sx={{ borderRadius: '10px', marginTop: '10px' }} />
//             </Box>
//             <Box>
//               <Typography variant="h6">Guest Information</Typography>
//               <TextField name="name" label="First Name" value={guestInfo.name} onChange={handleGuestInfoChange} fullWidth sx={{ marginBottom: 2 }} />
//               <TextField name="surname" label="Last Name" value={guestInfo.surname} onChange={handleGuestInfoChange} fullWidth sx={{ marginBottom: 2 }} />
//               <TextField name="email" label="Email Address" value={guestInfo.email} onChange={handleGuestInfoChange} fullWidth sx={{ marginBottom: 2 }} />
//               <TextField name="phone" label="Phone Number" value={guestInfo.phone} onChange={handleGuestInfoChange} fullWidth sx={{ marginBottom: 2 }} />
//             </Box>
//             <Box>
//               <Typography variant="h6">Payment Information</Typography>
//               <CardElement options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' }, padding: '10px' }, invalid: { color: '#9e2146' } }, hidePostalCode: true }} />
//             </Box>
//           </DialogContent>
//           <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
//             <Button onClick={handleBooking} variant="contained" color="primary" sx={{ backgroundColor: 'black', width: '100%' }} disabled={!user}>
//               Confirm and Pay with Stripe
//             </Button>
//           </Box>
//         </Dialog>
//       )}
//     </div>
//   );
// };

// export default BookingComponent;




import React, { useState, useEffect } from 'react';
import {
  Button, TextField, Card, CardContent, CardMedia, Typography, Grid, IconButton, Box, Dialog, DialogTitle, DialogContent, Container
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import { addBooking, addFavorite, setBookings, setFavorites } from './BookingSlice';
import { setCheckInDate, setCheckOutDate, setGuests, setAmount } from './paymentSlice';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const roomsData = [
  { id: 1, type: 'standard', price: 1000, image: 'standard.jpg', rating: 4.5, amenities: ['Free WiFi', 'TV'], policies: ['No Smoking', 'No Pets'], description: 'A cozy standard room.' },
  { id: 2, type: 'suite', price: 2000, image: 'suite.jpg', rating: 4.8, amenities: ['Free WiFi', 'TV', 'Mini Bar'], policies: ['No Smoking', 'No Pets'], description: 'A luxurious suite with extra space.' },
  { id: 3, type: 'double', price: 1500, image: 'double.jpg', rating: 4.6, amenities: ['Free WiFi', 'TV', 'Air Conditioning', 'Tea/Coffee Maker'], policies: ['No Smoking', 'No Pets', 'Check-in after 3 PM', 'Check-out before 11 AM'], description: 'A spacious double room with comfortable beds and modern amenities for a relaxing stay.' },
  { id: 4, type: 'queen', price: 1800, image: 'queen.jpg', rating: 4.7, amenities: ['Free WiFi', 'TV', 'Mini Bar', 'Work Desk'], policies: ['No Smoking', 'No Pets', 'Check-in after 3 PM', 'Check-out before 11 AM'], description: 'A stylish queen room with elegant decor, a mini bar, and a dedicated workspace.' },
  { id: 5, type: 'king', price: 2500, image: 'king.jpg', rating: 4.9, amenities: ['Free WiFi', 'TV', 'Private Balcony', 'Jacuzzi', 'Mini Bar'], policies: ['No Smoking', 'No Pets', 'Check-in after 2 PM', 'Check-out before 12 PM'], description: 'An opulent king room with a private balcony, a Jacuzzi, and premium amenities for the ultimate experience.' }
];

const BookingComponent = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [filteredRooms, setFilteredRooms] = useState(roomsData);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [open, setOpen] = useState(false);
  const [checkInDate, setCheckInDateLocal] = useState(null);
  const [checkOutDate, setCheckOutDateLocal] = useState(null);
  const [guests, setGuestsLocal] = useState(1);
  const [guestInfo, setGuestInfo] = useState({ name: '', surname: '', email: '', phone: '' });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    dispatch(setBookings(roomsData));
    dispatch(setFavorites([]));
  }, [dispatch]);

  const handleFilter = (type) => {
    setSelectedType(type);
    if (type === 'all') {
      setFilteredRooms(roomsData);
    } else {
      setFilteredRooms(roomsData.filter(room => room.type === type));
    }
  };

  const handleOpen = (room) => {
    setSelectedRoom(room);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRoom(null);
  };

  const handleAddToFavorites = async (room) => {
    if (!user) {
      alert('You need to be logged in to add to favorites.');
      return;
    }

    try {
      const docRef = doc(db, 'favorites', room.id.toString());
      await setDoc(docRef, {
        ...room,
        userId: user.uid,
        addedAt: new Date(),
      });
      dispatch(addFavorite(room));
    } catch (error) {
      console.error("Error adding to favorites: ", error);
    }
  };

  const handleShare = (room) => {
    if (navigator.share) {
      navigator.share({
        title: `${room.type} Room`,
        text: `Check out this ${room.type} room priced at R${room.price} per night!`,
        url: window.location.href,
      });
    } else {
      alert('Your browser does not support the Share API');
    }
  };

  const handleBooking = async () => {
    if (!user) {
      alert('You need to be logged in to book a room.');
      return;
    }

    dispatch(setAmount(selectedRoom.price));
    dispatch(setCheckInDate(checkInDate ? checkInDate.toISOString() : null));
    dispatch(setCheckOutDate(checkOutDate ? checkOutDate.toISOString() : null));
    dispatch(setGuests(guests));

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
      await setDoc(doc(db, 'bookings', `${selectedRoom.id}-${user.uid}`), {
        ...selectedRoom,
        userId: user.uid,
        checkInDate: checkInDate ? checkInDate.toISOString() : null,
        checkOutDate: checkOutDate ? checkOutDate.toISOString() : null,
        guests,
        amount: selectedRoom.price,
        bookedAt: new Date(),
        paymentMethodId: paymentMethod.id,
        guestInfo
      });
      dispatch(addBooking({
        ...selectedRoom,
        userId: user.uid,
        checkInDate: checkInDate ? checkInDate.toISOString() : null,
        checkOutDate: checkOutDate ? checkOutDate.toISOString() : null,
        guests,
        amount: selectedRoom.price,
        guestInfo
      }));
      alert('Room booked successfully');
      handleClose();
    } catch (error) {
      console.error('Error booking room:', error);
      alert('Booking failed');
    }
  };

  const handleGuestInfoChange = (e) => {
    setGuestInfo({ ...guestInfo, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '40px 0', overflowX: 'auto', width: '100%', padding: '10px' }}>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Button onClick={() => handleFilter('all')} variant="contained">All Rooms</Button>
          <Button onClick={() => handleFilter('standard')} variant="contained">Standard</Button>
          <Button onClick={() => handleFilter('suite')} variant="contained">Suite</Button>
          <Button onClick={() => handleFilter('double')} variant="contained">Double</Button>
          <Button onClick={() => handleFilter('queen')} variant="contained">Queen</Button>
          <Button onClick={() => handleFilter('king')} variant="contained">King</Button>
        </Box>
      </Box>
      <Container>
        <Grid container spacing={2}>
          {filteredRooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={room.id}>
              <Card>
                <CardMedia component="img" height="140" image={room.image} alt={room.type} />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {room.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    R{room.price} per night
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {room.rating} stars
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '8px' }}>
                  <IconButton onClick={() => handleAddToFavorites(room)} aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpen(room)} aria-label="view more">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => handleShare(room)} aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedRoom?.type} Room
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <img src={selectedRoom?.image} alt={selectedRoom?.type} style={{ width: '100%' }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">{selectedRoom?.type}</Typography>
                <Typography variant="body2">R{selectedRoom?.price} per night</Typography>
                <Typography variant="body2">Rating: {selectedRoom?.rating} stars</Typography>
                <Typography variant="body2">Description: {selectedRoom?.description}</Typography>
                <Typography variant="body2">Amenities: {selectedRoom?.amenities.join(', ')}</Typography>
                <Typography variant="body2">Policies: {selectedRoom?.policies.join(', ')}</Typography>
              </Grid>
            </Grid>
            <Box mt={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Check-in Date"
                      value={checkInDate}
                      onChange={(date) => setCheckInDateLocal(date)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Check-out Date"
                      value={checkOutDate}
                      onChange={(date) => setCheckOutDateLocal(date)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </Grid>
                </Grid>
              </LocalizationProvider>
              <Box mt={2}>
                <TextField
                  type="number"
                  label="Number of Guests"
                  value={guests}
                  onChange={(e) => setGuestsLocal(Number(e.target.value))}
                  fullWidth
                />
              </Box>
              <Box mt={2}>
                <TextField
                  label="Name"
                  name="name"
                  value={guestInfo.name}
                  onChange={handleGuestInfoChange}
                  fullWidth
                />
              </Box>
              <Box mt={2}>
                <TextField
                  label="Surname"
                  name="surname"
                  value={guestInfo.surname}
                  onChange={handleGuestInfoChange}
                  fullWidth
                />
              </Box>
              <Box mt={2}>
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={guestInfo.email}
                  onChange={handleGuestInfoChange}
                  fullWidth
                />
              </Box>
              <Box mt={2}>
                <TextField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={guestInfo.phone}
                  onChange={handleGuestInfoChange}
                  fullWidth
                />
              </Box>
              <Box mt={2}>
                <CardElement />
              </Box>
              <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary" onClick={handleBooking}>
                  Book Now
                </Button>
              </Box>
            </Box>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingComponent;
