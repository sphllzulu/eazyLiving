// import React, { useState } from 'react';
// import { Button, Card, CardContent, CardMedia, Typography, Grid, IconButton, Chip, Box, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import CloseIcon from '@mui/icons-material/Close';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// const roomsData = [
//   { id: 1, type: 'standard', price: 100, image: 'standard.jpg', rating: 4.5 },
//   { id: 2, type: 'suite', price: 200, image: 'suite.jpg', rating: 4.8 },
//   { id: 3, type: 'double', price: 150, image: 'double.jpg', rating: 4.2 },
//   { id: 4, type: 'queen', price: 180, image: 'queen.jpg', rating: 4.6 },
//   { id: 5, type: 'king', price: 220, image: 'king.jpg', rating: 4.9 },
//   { id: 6, type: 'king', price: 220, image: 'king.jpg', rating: 4.9 },
//   { id: 7, type: 'king', price: 220, image: 'king.jpg', rating: 4.9 },
//   { id: 8, type: 'king', price: 220, image: 'king.jpg', rating: 4.9 },
// ];

// const [checkInDate, setCheckInDate] = React.useState(null);
//   const [checkOutDate, setCheckOutDate] = React.useState(null);

// const BookingComponent = ( ) => {
//   const [selectedType, setSelectedType] = useState('all');
//   const [filteredRooms, setFilteredRooms] = useState(roomsData);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [open, setOpen] = useState(false);

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

//   return (
//     <div>
//       <Box 
//   sx={{ 
//     display: 'flex', 
//     justifyContent: 'center', 
//     margin: '40px 0', 
//     overflowX: 'auto', 
//     width: '100%', 
//     padding: '10px'
//   }}
// >
//   <Box sx={{ display: 'flex', justifyContent: 'center', minWidth: 'max-content' }}>
//     {['all', 'standard', 'suite', 'double', 'queen', 'king', 'quad'].map((type) => (
//       <Button
//         key={type}
//         variant={selectedType === type ? 'contained' : 'outlined'}
//         onClick={() => handleFilter(type)}

//       >
//         {type}
//       </Button>
//     ))}
//   </Box>
// </Box>

//       <Grid 
//         container 
//         spacing={4} 
//         sx={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center',
//           width: '90%',
//           margin: 'auto ',
//         }}
//       >
//         {filteredRooms.map(room => (
//           <Grid item xs={12} sm={6} md={6} key={room.id}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={room.image}
//                 alt={room.type}
//               />
//               <CardContent>
//                 <Typography variant="h6">{room.type} Room</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Price: R{room.price}/night
//                 </Typography>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
//                   <Chip label={`${room.rating} ★`} color="secondary" />
//                   <Box>
//                     <IconButton color="primary">
//                       <FavoriteIcon />
//                     </IconButton>
//                     <IconButton color="primary" onClick={() => handleOpen(room)}>
//                       <VisibilityIcon />
//                     </IconButton>
//                   </Box>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Dialog for Room Details */}
//       <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//       <DialogTitle>
//         {selectedRoom?.type} Room Details
//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <Grid container spacing={2}>
//           {/* Display 5 images */}
//           {[...Array(5)].map((_, index) => (
//             <Grid item xs={12} sm={6} key={index}>
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={selectedRoom?.image}
//                 alt={selectedRoom?.type}
//               />
//             </Grid>
//           ))}
//         </Grid>

//         <Typography variant="body1" sx={{ marginTop: '20px' }}>
//           Experience comfort and elegance in our beautifully appointed {selectedRoom?.type} room, featuring modern amenities, plush bedding, and stunning views. Whether you're here for business or leisure, unwind in a serene atmosphere designed for relaxation and convenience.
//         </Typography>

//         <Box sx={{ marginTop: '20px' }}>
//           <Typography variant="h6">Amenities</Typography>
//           <ul>
//             <li>Wi-Fi</li>
//             <li>Ocean View</li>
//             <li>Private Hot Tub</li>
//             <li>Free Parking</li>
//             <li>Kitchen</li>
//             <li>Private Patio</li>
//           </ul>
//         </Box>

//         {/* Date pickers for check-in and check-out dates */}
//         <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               label="Check-in Date"
//               value={checkInDate}
//               onChange={(newValue) => setCheckInDate(newValue)}
//               renderInput={(params) => <TextField {...params} />}
//             />
//             <DatePicker
//               label="Check-out Date"
//               value={checkOutDate}
//               onChange={(newValue) => setCheckOutDate(newValue)}
//               renderInput={(params) => <TextField {...params} />}
//             />
//           </LocalizationProvider>
//         </Box>

//         <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography variant="h5">
//             R{selectedRoom?.price} per night
//           </Typography>
//           <FormControl variant="outlined" sx={{ minWidth: 120 }}>
//             <InputLabel id="guest-select-label">Guests</InputLabel>
//             <Select
//               labelId="guest-select-label"
//               id="guest-select"
//               label="Guests"
//             >
//               <MenuItem value={1}>1 guest</MenuItem>
//               <MenuItem value={2}>2 guests</MenuItem>
//               <MenuItem value={3}>3 guests</MenuItem>
//               <MenuItem value={4}>4 guests</MenuItem>
//             </Select>
//           </FormControl>
//           <Button variant="contained" color="primary" sx={{ backgroundColor: '#0000ff' }}>
//             Book
//           </Button>
//         </Box>
//       </DialogContent>
//     </Dialog>
//     </div>
//   );
// };

// export default BookingComponent;


// import React, { useState } from 'react';
// import {
//   Button, Card, CardContent, CardMedia, Typography, Grid, IconButton, Chip,
//   Box, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, TextField
// } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import CloseIcon from '@mui/icons-material/Close';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// const roomsData = [
//   { id: 1, type: 'standard', price: 100, image: 'standard.jpg', rating: 4.5 },
//   { id: 2, type: 'suite', price: 200, image: 'suite.jpg', rating: 4.8 },
//   { id: 3, type: 'double', price: 150, image: 'double.jpg', rating: 4.2 },
//   { id: 4, type: 'queen', price: 180, image: 'queen.jpg', rating: 4.6 },
//   { id: 5, type: 'king', price: 220, image: 'king.jpg', rating: 4.9 },
// ];

// const BookingComponent = () => {
//   const [selectedType, setSelectedType] = useState('all');
//   const [filteredRooms, setFilteredRooms] = useState(roomsData);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [checkInDate, setCheckInDate] = useState(null);
//   const [checkOutDate, setCheckOutDate] = useState(null);

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

//   return (
//     <div>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           margin: '40px 0',
//           overflowX: 'auto',
//           width: '100%',
//           padding: '10px'
//         }}
//       >
//         <Box sx={{ display: 'flex', justifyContent: 'center', minWidth: 'max-content' }}>
//           {['all', 'standard', 'suite', 'double', 'queen', 'king'].map((type) => (
//             <Button
//               key={type}
//               variant={selectedType === type ? 'contained' : 'outlined'}
//               onClick={() => handleFilter(type)}
//             >
//               {type}
//             </Button>
//           ))}
//         </Box>
//       </Box>

//       <Grid
//         container
//         spacing={4}
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           width: '90%',
//           margin: 'auto ',
//         }}
//       >
//         {filteredRooms.map(room => (
//           <Grid item xs={12} sm={6} md={6} key={room.id}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={room.image}
//                 alt={room.type}
//               />
//               <CardContent>
//                 <Typography variant="h6">{room.type} Room</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Price: R{room.price}/night
//                 </Typography>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
//                   <Chip label={`${room.rating} ★`} color="secondary" />
//                   <Box>
//                     <IconButton color="primary">
//                       <FavoriteIcon />
//                     </IconButton>
//                     <IconButton color="primary" onClick={() => handleOpen(room)}>
//                       <VisibilityIcon />
//                     </IconButton>
//                   </Box>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Dialog for Room Details */}
//       <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//         <DialogTitle>
//           {selectedRoom?.type} Room Details
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2}>
//             {/* Display 5 images */}
//             {[...Array(5)].map((_, index) => (
//               <Grid item xs={12} sm={6} key={index}>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={selectedRoom?.image}
//                   alt={selectedRoom?.type}
//                 />
//               </Grid>
//             ))}
//           </Grid>

//           <Typography variant="body1" sx={{ marginTop: '20px' }}>
//             Experience comfort and elegance in our beautifully appointed {selectedRoom?.type} room, featuring modern amenities, plush bedding, and stunning views. Whether you're here for business or leisure, unwind in a serene atmosphere designed for relaxation and convenience.
//           </Typography>

//           <Box sx={{ marginTop: '20px' }}>
//             <Typography variant="h6">Amenities</Typography>
//             <ul>
//               <li>Wi-Fi</li>
//               <li>Ocean View</li>
//               <li>Private Hot Tub</li>
//               <li>Free Parking</li>
//               <li>Kitchen</li>
//               <li>Private Patio</li>
//             </ul>
//           </Box>

//           {/* Date pickers for check-in and check-out dates */}
//           <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 label="Check-in Date"
//                 value={checkInDate}
//                 onChange={(newValue) => setCheckInDate(newValue)}
//                 renderInput={(params) => <TextField {...params} />}
//               />
//               <DatePicker
//                 label="Check-out Date"
//                 value={checkOutDate}
//                 onChange={(newValue) => setCheckOutDate(newValue)}
//                 renderInput={(params) => <TextField {...params} />}
//               />
//             </LocalizationProvider>
//           </Box>

//           <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h5">
//               R{selectedRoom?.price} per night
//             </Typography>
//             <FormControl variant="outlined" sx={{ minWidth: 120 }}>
//               <InputLabel id="guest-select-label">Guests</InputLabel>
//               <Select
//                 labelId="guest-select-label"
//                 id="guest-select"
//                 label="Guests"
//               >
//                 <MenuItem value={1}>1 guest</MenuItem>
//                 <MenuItem value={2}>2 guests</MenuItem>
//                 <MenuItem value={3}>3 guests</MenuItem>
//                 <MenuItem value={4}>4 guests</MenuItem>
//               </Select>
//             </FormControl>
//             <Button variant="contained" color="primary" sx={{ backgroundColor: '#0000ff' }}>
//               Book
//             </Button>
//           </Box>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default BookingComponent;



// import React, { useState } from 'react';
// import {
//   Button, Card, CardContent, CardMedia, Typography, Grid, IconButton, Chip,
//   Box, Dialog, DialogTitle, DialogContent
// } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import ShareIcon from '@mui/icons-material/Share';
// import CloseIcon from '@mui/icons-material/Close';
// import { useDispatch } from 'react-redux';
// import { addBooking } from './BookingSlice'; // Import the slice function
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from './firebase'; // Ensure you have configured Firebase

// const roomsData = [
//   { id: 1, type: 'standard', price: 100, image: 'standard.jpg', rating: 4.5 },
//   { id: 2, type: 'suite', price: 200, image: 'suite.jpg', rating: 4.8 },
//   { id: 3, type: 'double', price: 150, image: 'double.jpg', rating: 4.2 },
//   { id: 4, type: 'queen', price: 180, image: 'queen.jpg', rating: 4.6 },
//   { id: 5, type: 'king', price: 220, image: 'king.jpg', rating: 4.9 },
// ];

// const BookingComponent = () => {
//   const [selectedType, setSelectedType] = useState('all');
//   const [filteredRooms, setFilteredRooms] = useState(roomsData);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [open, setOpen] = useState(false);
//   const dispatch = useDispatch();

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
//     // Save to Firestore
//     const docRef = doc(db, 'favorites', room.id.toString());
//     await setDoc(docRef, {
//       ...room,
//       addedAt: new Date(),
//     });

//     // Dispatch to Redux
//     dispatch(addBooking(room));
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

//   return (
//     <div>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           margin: '40px 0',
//           overflowX: 'auto',
//           width: '100%',
//           padding: '10px'
//         }}
//       >
//         <Box sx={{ display: 'flex', justifyContent: 'center', minWidth: 'max-content' }}>
//           {['all', 'standard', 'suite', 'double', 'queen', 'king'].map((type) => (
//             <Button
//               key={type}
//               variant={selectedType === type ? 'contained' : 'outlined'}
//               onClick={() => handleFilter(type)}
//             >
//               {type}
//             </Button>
//           ))}
//         </Box>
//       </Box>

//       <Grid
//         container
//         spacing={4}
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           width: '90%',
//           margin: 'auto ',
//         }}
//       >
//         {filteredRooms.map(room => (
//           <Grid item xs={12} sm={6} md={6} key={room.id}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={room.image}
//                 alt={room.type}
//               />
//               <CardContent>
//                 <Typography variant="h6">{room.type} Room</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Price: R{room.price}/night
//                 </Typography>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
//                   <Chip label={`${room.rating} ★`} color="secondary" />
//                   <Box>
//                     <IconButton color="primary" onClick={() => handleAddToFavorites(room)}>
//                       <FavoriteIcon />
//                     </IconButton>
//                     <IconButton color="primary" onClick={() => handleOpen(room)}>
//                       <VisibilityIcon />
//                     </IconButton>
//                     <IconButton color="primary" onClick={() => handleShare(room)}>
//                       <ShareIcon />
//                     </IconButton>
//                   </Box>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Dialog for Room Details */}
//       <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//         <DialogTitle>
//           {selectedRoom?.type} Room Details
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2}>
//             {/* Display 5 images */}
//             {[...Array(5)].map((_, index) => (
//               <Grid item xs={12} sm={6} key={index}>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={selectedRoom?.image}
//                   alt={selectedRoom?.type}
//                 />
//               </Grid>
//             ))}
//           </Grid>

//           <Typography variant="body1" sx={{ marginTop: '20px' }}>
//             Experience comfort and elegance in our beautifully appointed {selectedRoom?.type} room, featuring modern amenities, plush bedding, and stunning views. Whether you're here for business or leisure, unwind in a serene atmosphere designed for relaxation and convenience.
//           </Typography>

//           <Box sx={{ marginTop: '20px' }}>
//             <Typography variant="h6">Amenities</Typography>
//             <ul>
//               <li>Wi-Fi</li>
//               <li>Ocean View</li>
//               <li>Private Hot Tub</li>
//               <li>Free Parking</li>
//               <li>Kitchen</li>
//               <li>Private Patio</li>
//             </ul>
//           </Box>

//           <Box sx={{ marginTop: '20px' }}>
//             <Typography variant="h6">Policies</Typography>
//             <ul>
//               <li>Check-in after 3 PM</li>
//               <li>Check-out before 11 AM</li>
//               <li>No smoking</li>
//               <li>Pet-friendly (additional charges apply)</li>
//             </ul>
//           </Box>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default BookingComponent;



import React, { useEffect, useState } from 'react';
import {
  Button, Card, CardContent, CardMedia, Typography, Grid, IconButton, Chip,
  Box, Dialog, DialogTitle, DialogContent
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import PaymentComponent from './PaymentComponent';
import { Link } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase"; 
import { useDispatch } from 'react-redux';
import { saveBulkDataToFirestore } from './BookingSlice'; // Import the slice function

const roomsData = [
  { id: 1, type: 'standard', price: 100, image: 'standard.jpg', rating: 4.5 },
  { id: 2, type: 'suite', price: 200, image: 'suite.jpg', rating: 4.8 },
  { id: 3, type: 'double', price: 150, image: 'double.jpg', rating: 4.2 },
  { id: 4, type: 'queen', price: 180, image: 'queen.jpg', rating: 4.6 },
  { id: 5, type: 'king', price: 220, image: 'king.jpg', rating: 4.9 },
  { id: 5, type: 'king', price: 220, image: 'king.jpg', rating: 4.9 },

];

const BookingComponent = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [filteredRooms, setFilteredRooms] = useState(roomsData);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch action to save initial data to Firestore
    dispatch(saveBulkDataToFirestore({ bookings: roomsData, favorites: [] }));
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
    // Save to Firestore
    const docRef = doc(db, 'favorites', room.id.toString());
    await setDoc(docRef, {
      ...room,
      addedAt: new Date(),
    });
    dispatch(addFavorite(room));
  };

  // const handleAddToFavorites = async (room) => {
  //   try {
  //     // Create a reference to the document in Firestore
  //     const docRef = doc(db, 'favorites', room.id.toString());
  //     // Save the favorite room to Firestore
  //     await setDoc(docRef, {
  //       ...room,
  //       addedAt: new Date(),
  //     });
  //     // Dispatch the favorite to the Redux store
  //     dispatch(addFavorite(room));
  //   } catch (error) {
  //     console.error("Error adding to favorites: ", error);
  //   }
  // };


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

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: '40px 0',
          overflowX: 'auto',
          width: '100%',
          padding: '10px'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', minWidth: 'max-content' }}>
          {['all', 'standard', 'suite', 'double', 'queen', 'king'].map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? 'contained' : 'outlined'}
              onClick={() => handleFilter(type)}
            >
              {type}
            </Button>
          ))}
        </Box>
      </Box>

      <Grid
        container
        spacing={4}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '90%',
          margin: 'auto ',
        }}
      >
        {filteredRooms.map(room => (
          <Grid item xs={12} sm={6} md={6} key={room.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={room.image}
                alt={room.type}
              />
              <CardContent>
                <Typography variant="h6">{room.type} Room</Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: R{room.price}/night
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <Chip label={`${room.rating} ★`} color="secondary" />
                  <Box>
                    <IconButton color="primary" onClick={() => handleAddToFavorites(room)}>
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => handleOpen(room)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => handleShare(room)}>
                      <ShareIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Room Details */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth >
        <DialogTitle>
          {selectedRoom?.type} Room Details
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {/* Display 5 images */}
            {[...Array(4)].map((_, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <CardMedia
                  component="img"
                  height="140"
                  image={selectedRoom?.image}
                  alt={selectedRoom?.type}
                />
              </Grid>
            ))}
          </Grid>

          <Typography variant="body1" sx={{ marginTop: '20px' }}>
            Experience comfort and elegance in our beautifully appointed {selectedRoom?.type} room, featuring modern amenities, plush bedding, and stunning views. Whether you're here for business or leisure, unwind in a serene atmosphere designed for relaxation and convenience.
          </Typography>
          <Grid
  container
  spacing={4}
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: 'auto',
    width: '100%',
  }}
>
  <Grid item xs={12} sm={6}>
    <Box sx={{ marginTop: '20px' }}>
      <Typography variant="h6">Amenities</Typography>
      <ul>
        <li>Wi-Fi</li>
        <li>Ocean View</li>
        <li>Private Hot Tub</li>
        <li>Free Parking</li>
        <li>Kitchen</li>
        <li>Private Patio</li>
      </ul>
    </Box>
  </Grid>

  <Grid item xs={12} sm={6}>
    <Box sx={{ marginTop: '20px' }}>
      <Typography variant="h6">Policies</Typography>
      <ul>
        <li>Check-in after 3 PM</li>
        <li>Check-out before 11 AM</li>
        <li>No smoking</li>
        <li>Pet-friendly (with restrictions)</li>
        <li>Cancellation policy: 48 hours before check-in</li>
      </ul>
    </Box>
  </Grid>
</Grid>

          <PaymentComponent/>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={() => handleAddToFavorites(selectedRoom)}>
              Add to Favorites
            </Button>
            <Button variant="contained" color="secondary" onClick={() => handleShare(selectedRoom)}>
              Share
            </Button>
            {/* <Link to='/payment'>
            <Button variant="contained" color="secondary" >
              Book
            </Button>
            </Link> */}
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingComponent;
