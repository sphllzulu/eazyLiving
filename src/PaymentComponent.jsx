



// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import StripeCheckout from 'react-stripe-checkout';
// import { updatePaymentDetails, setCheckInDate, setCheckOutDate, setGuests, setStripeToken, setPaymentStatus, setAmount } from './paymentSlice';
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from './firebase'; // Firestore instance
// import { Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// const PaymentComponent = () => {
//   const dispatch = useDispatch();
//   const [checkInDate, setCheckInDateLocal] = useState(null);
//   const [checkOutDate, setCheckOutDateLocal] = useState(null);
//   const [guests, setGuestsLocal] = useState(1);
//   const paymentDetails = useSelector((state) => state.payment);

//   const handleInputChange = (e) => {
//     dispatch(updatePaymentDetails({ [e.target.name]: e.target.value }));
//   };

//   const onToken = async (token) => {
//     console.log(token);

//     // Dispatch the Stripe token and payment status to Redux
//     dispatch(setStripeToken(token.id));
//     dispatch(setPaymentStatus('Pending'));

//     try {
//       await setDoc(doc(db, 'payments', token.id), {
//         ...paymentDetails,
//         stripeToken: token.id,
//         paymentStatus: 'Pending',
//         createdAt: new Date(),
//         checkInDate: checkInDate ? checkInDate.toISOString() : null,
//         checkOutDate: checkOutDate ? checkOutDate.toISOString() : null,
//         guests,
//       });

//       alert('Payment Successful');
//       dispatch(setPaymentStatus('Successful')); // Update payment status in Redux
//     } catch (error) {
//       console.error('Error saving payment to Firestore:', error);
//       alert('Payment Failed');
//       dispatch(setPaymentStatus('Failed')); // Update payment status in Redux
//     }
//   };

//   return (
//     <Box sx={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
//       <Typography variant="h6" sx={{ marginBottom: '20px' }}>Guest Information</Typography>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//         <TextField 
//           label="First Name" 
//           name="firstName" 
//           onChange={handleInputChange} 
//           value={paymentDetails.firstName} 
//         />
//         <TextField 
//           label="Last Name" 
//           name="lastName" 
//           onChange={handleInputChange} 
//           value={paymentDetails.lastName} 
//         />
//       </Box>
//       <TextField 
//         fullWidth 
//         label="Email" 
//         name="email" 
//         onChange={handleInputChange} 
//         value={paymentDetails.email} 
//         sx={{ marginY: '10px' }} 
//       />
//       <TextField 
//         fullWidth 
//         label="Address" 
//         name="address" 
//         onChange={handleInputChange} 
//         value={paymentDetails.address} 
//       />
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
//         <TextField 
//           label="Postal Code" 
//           name="postalCode" 
//           onChange={handleInputChange} 
//           value={paymentDetails.postalCode} 
//         />
//         <TextField 
//           label="Phone Number" 
//           name="phoneNumber" 
//           onChange={handleInputChange} 
//           value={paymentDetails.phoneNumber} 
//         />
//       </Box>

//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <Box sx={{ marginTop: '10px' }}>
//           <DatePicker
//             label="Check-in Date"
//             value={checkInDate}
//             onChange={(newValue) => {
//               setCheckInDateLocal(newValue);
//               dispatch(setCheckInDate(newValue ? newValue.toISOString() : null));
//             }}
//             renderInput={(params) => <TextField {...params} fullWidth />}
//           />
//           <DatePicker
//             label="Check-out Date"
//             value={checkOutDate}
//             onChange={(newValue) => {
//               setCheckOutDateLocal(newValue);
//               dispatch(setCheckOutDate(newValue ? newValue.toISOString() : null));
//             }}
//             renderInput={(params) => <TextField {...params} fullWidth />}
//             sx={{ marginTop: '10px' }}
//           />
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel id="guests-label">Number of Guests</InputLabel>
//             <Select
//               labelId="guests-label"
//               value={guests}
//               onChange={(e) => {
//                 setGuestsLocal(e.target.value);
//                 dispatch(setGuests(e.target.value));
//               }}
//               label="Number of Guests"
//             >
//               {[1, 2, 3, 4, 5].map((number) => (
//                 <MenuItem key={number} value={number}>
//                   {number}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>
//       </LocalizationProvider>

//       <Typography variant="h6" sx={{ marginTop: '20px' }}>Payment</Typography>
//       <StripeCheckout
//         token={onToken}
//         name="Hotel Booking"
//         currency="ZAR"
//         amount={paymentDetails.amount * 100} // Stripe expects the amount in cents
//         stripeKey="pk_test_51PuTr7LOTigiMrGc4kJLk7Qkg7DeJn4I7yopiOdsLpprbiw7QCTKvztnOZrREYH6YQ75ELZz15tblpYpGUvpP3AG00TB1uLG3e"
//       >
//         <Button variant="contained" color="primary" fullWidth sx={{ marginTop: '20px' }}>
//           Book Now for R{paymentDetails.amount}
//         </Button>
//       </StripeCheckout>

//       <Typography variant="body2" sx={{ marginTop: '20px', color: 'gray' }}>
//         By booking, I certify that I have read and accepted the terms of use and privacy statement...
//       </Typography>
//     </Box>
//   );
// };

// export default PaymentComponent;



// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import StripeCheckout from 'react-stripe-checkout';
// import { updatePaymentDetails, setCheckInDate, setCheckOutDate, setGuests, setStripeToken, setPaymentStatus, setAmount } from './paymentSlice';
// import { doc, setDoc } from 'firebase/firestore';
// import { auth, db } from './firebase'; // Firestore instance
// import { Container , Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// const PaymentComponent = () => {
//   const dispatch = useDispatch();
//   const [checkInDate, setCheckInDateLocal] = useState(null);
//   const [checkOutDate, setCheckOutDateLocal] = useState(null);
//   const [guests, setGuestsLocal] = useState(1);
//   const paymentDetails = useSelector((state) => state.payment);
//   const user = useSelector((state) => state.user.user); // Get the authenticated user

//   const handleInputChange = (e) => {
//     dispatch(updatePaymentDetails({ [e.target.name]: e.target.value }));
//   };

//   const onToken = async (token) => {
//     console.log(token);

//     if (!user) {
//       alert('You need to be logged in to make a payment.');
//       return;
//     }

//     // Dispatch the Stripe token and payment status to Redux
//     dispatch(setStripeToken(token.id));
//     dispatch(setPaymentStatus('Pending'));

//     try {
//       await setDoc(doc(db, 'payments', token.id), {
//         userId: user.uid, // Link the payment to the authenticated user
//         ...paymentDetails,
//         stripeToken: token.id,
//         paymentStatus: 'Pending',
//         createdAt: new Date(),
//         checkInDate: checkInDate ? checkInDate.toISOString() : null,
//         checkOutDate: checkOutDate ? checkOutDate.toISOString() : null,
//         guests,
//       });

//       alert('Payment Successful');
//       dispatch(setPaymentStatus('Successful')); // Update payment status in Redux
//     } catch (error) {
//       console.error('Error saving payment to Firestore:', error);
//       alert('Payment Failed');
//       dispatch(setPaymentStatus('Failed')); // Update payment status in Redux
//     }
//   };

//   return (
//     <Container sx={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
//       <Typography variant="h6" sx={{ marginBottom: '20px' }}>Guest Information</Typography>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//         <TextField 
//           fullWidth
//           label="First Name" 
//           name="firstName" 
//           onChange={handleInputChange} 
//           value={paymentDetails.firstName} 
//         />
//         <TextField 
//           fullWidth
//           label="Last Name" 
//           name="lastName" 
//           onChange={handleInputChange} 
//           value={paymentDetails.lastName} 
//         />
//       </Box>
//       <TextField 
//         fullWidth 
//         label="Email" 
//         name="email" 
//         onChange={handleInputChange} 
//         value={paymentDetails.email} 
//         sx={{ marginY: '10px' }} 
//       />
//       <TextField 
//         fullWidth 
//         label="Address" 
//         name="address" 
//         onChange={handleInputChange} 
//         value={paymentDetails.address} 
//       />
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
//         <TextField 
//           fullWidth
//           label="Postal Code" 
//           name="postalCode" 
//           onChange={handleInputChange} 
//           value={paymentDetails.postalCode} 
//         />
//         <TextField 
//           fullWidth
//           label="Phone Number" 
//           name="phoneNumber" 
//           onChange={handleInputChange} 
//           value={paymentDetails.phoneNumber} 
//         />
//       </Box>

//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <Box sx={{ marginTop: '10px',display: 'flex', justifyContent: 'space-between' }}>
//           <DatePicker
//             fullWidth
//             sx={{ marginTop: '10px'}}
//             label="Check-in Date"
//             value={checkInDate}
//             onChange={(newValue) => {
//               setCheckInDateLocal(newValue);
//               dispatch(setCheckInDate(newValue ? newValue.toISOString() : null));
//             }}
//             renderInput={(params) => <TextField {...params} fullWidth />}
//           />
//           <DatePicker
//           fullWidth
//           sx={{ marginTop: '10px'}}
//             label="Check-out Date"
//             value={checkOutDate}
//             onChange={(newValue) => {
//               setCheckOutDateLocal(newValue);
//               dispatch(setCheckOutDate(newValue ? newValue.toISOString() : null));
//             }}
//             renderInput={(params) => <TextField {...params} fullWidth />}
           
//           />
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel id="guests-label">Number of Guests</InputLabel>
//             <Select
//               labelId="guests-label"
//               value={guests}
//               onChange={(e) => {
//                 setGuestsLocal(e.target.value);
//                 dispatch(setGuests(e.target.value));
//               }}
//               label="Number of Guests"
//             >
//               {[1, 2, 3, 4, 5].map((number) => (
//                 <MenuItem key={number} value={number}>
//                   {number}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>
//       </LocalizationProvider>

//       <Typography variant="h6" sx={{ marginTop: '20px' }}>Payment</Typography>
//       <StripeCheckout
//         token={onToken}
//         name="Hotel Booking"
//         currency="ZAR"
//         amount={paymentDetails.amount * 100} // Stripe expects the amount in cents
//         stripeKey="pk_test_51PuTr7LOTigiMrGc4kJLk7Qkg7DeJn4I7yopiOdsLpprbiw7QCTKvztnOZrREYH6YQ75ELZz15tblpYpGUvpP3AG00TB1uLG3e"
//       >
//         <Button variant="contained" color="primary" fullWidth sx={{ marginTop: '20px' }}>
//           Book Now for R{paymentDetails.amount}
//         </Button>
//       </StripeCheckout>

//       <Typography variant="body2" sx={{ marginTop: '20px', color: 'gray' }}>
//         By booking, I certify that I have read and accepted the terms of use and privacy statement...
//       </Typography>
//     </Container>
//   );
// };

// export default PaymentComponent;


import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch, useSelector } from 'react-redux';
import { setAmount } from './paymentSlice';

const PaymentComponent = () => {
  const dispatch = useDispatch();
  const paymentDetails = useSelector((state) => state.payment);

  const handleToken = (token) => {
    dispatch(setAmount(paymentDetails.amount));
    // Handle token with backend here
  };

  return (
    <StripeCheckout
      stripeKey="pk_test_51PuTr7LOTigiMrGc4kJLk7Qkg7DeJn4I7yopiOdsLpprbiw7QCTKvztnOZrREYH6YQ75ELZz15tblpYpGUvpP3AG00TB1uLG3e"
      token={handleToken}
      amount={paymentDetails.amount * 100} // Amount in cents
      name="Book Room"
      description={`Total: R${paymentDetails.amount}`}
      billingAddress
      shippingAddress
    />
  );
};

export default PaymentComponent;
