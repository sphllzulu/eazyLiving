


// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   address: '',
//   postalCode: '',
//   phoneNumber: '',
//   amount: 0,
//   checkInDate: null,
//   checkOutDate: null,
//   guests: 1,
//   stripeToken: '',
//   paymentStatus: '',
// };

// const paymentSlice = createSlice({
//   name: 'payment',
//   initialState,
//   reducers: {
//     updatePaymentDetails(state, action) {
//       return { ...state, ...action.payload };
//     },
//     setCheckInDate(state, action) {
//       state.checkInDate = action.payload;
//     },
//     setCheckOutDate(state, action) {
//       state.checkOutDate = action.payload;
//     },
//     setGuests(state, action) {
//       state.guests = action.payload;
//     },
//     setStripeToken(state, action) {
//       state.stripeToken = action.payload;
//     },
//     setPaymentStatus(state, action) {
//       state.paymentStatus = action.payload;
//     },
//     setAmount(state, action) {
//       state.amount = action.payload;
//     }
//   },
// });

// export const {
//   updatePaymentDetails,
//   setCheckInDate,
//   setCheckOutDate,
//   setGuests,
//   setStripeToken,
//   setPaymentStatus,
//   setAmount,
// } = paymentSlice.actions;

// export default paymentSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    postalCode: '',
    phoneNumber: '',
    amount: 0,
    checkInDate: null,
    checkOutDate: null,
    guests: 1,
    stripeToken: '',
    paymentStatus: '',
  },
  reducers: {
    updatePaymentDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
    setCheckInDate: (state, action) => {
      state.checkInDate = action.payload;
    },
    setCheckOutDate: (state, action) => {
      state.checkOutDate = action.payload;
    },
    setGuests: (state, action) => {
      state.guests = action.payload;
    },
    setStripeToken: (state, action) => {
      state.stripeToken = action.payload;
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
  },
});

export const { updatePaymentDetails, setCheckInDate, setCheckOutDate, setGuests, setStripeToken, setPaymentStatus, setAmount } = paymentSlice.actions;

export default paymentSlice.reducer;
