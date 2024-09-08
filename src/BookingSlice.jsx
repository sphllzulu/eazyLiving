// // src/features/bookingSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { db } from "./firebase";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";

// export const fetchBookings = createAsyncThunk(
//   "bookings/fetchBookings",
//   async () => {
//     const querySnapshot = await getDocs(collection(db, "bookings"));
//     const bookings = [];
//     querySnapshot.forEach((doc) => {
//       bookings.push({ id: doc.id, ...doc.data() });
//     });
//     return bookings;
//   }
// );

// export const addBooking = createAsyncThunk(
//   "bookings/addBooking",
//   async (newBooking) => {
//     const docRef = await addDoc(collection(db, "bookings"), newBooking);
//     return { id: docRef.id, ...newBooking };
//   }
// );

// export const cancelBooking = createAsyncThunk(
//   "bookings/cancelBooking",
//   async (id) => {
//     const docRef = doc(db, "bookings", id);
//     await deleteDoc(docRef);
//     return id;
//   }
// );

// const bookingSlice = createSlice({
//   name: "bookings",
//   initialState: {
//     bookings: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBookings.fulfilled, (state, action) => {
//         state.bookings = action.payload;
//         state.status = "succeeded";
//       })
//       .addCase(addBooking.fulfilled, (state, action) => {
//         state.bookings.push(action.payload);
//       })
//       .addCase(cancelBooking.fulfilled, (state, action) => {
//         state.bookings = state.bookings.filter(
//           (booking) => booking.id !== action.payload
//         );
//       });
//   },
// });

// export default bookingSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from './firebase'; 

// export const bookingSlice = createSlice({
//   name: 'booking',
//   initialState: {
//     favorites: [],
//     bookings: [],
//   },
//   reducers: {
//     addBooking: (state, action) => {
//       state.bookings.push(action.payload);
//     },
//     addFavorite: (state, action) => {
//       state.favorites.push(action.payload);
//     },
//   },
// });

// export const { addBooking, addFavorite } = bookingSlice.actions;

// export const saveBookingToFirestore = (booking) => async (dispatch) => {
//   try {
//     const docRef = doc(db, 'bookings', booking.id.toString());
//     await setDoc(docRef, booking);
//     dispatch(addBooking(booking));
//   } catch (error) {
//     console.error("Error adding document: ", error);
//   }
// };

// export const saveFavoriteToFirestore = (favorite) => async (dispatch) => {
//   try {
//     const docRef = doc(db, 'favorites', favorite.id.toString());
//     await setDoc(docRef, favorite);
//     dispatch(addFavorite(favorite));
//   } catch (error) {
//     console.error("Error adding document: ", error);
//   }
// };

// export default bookingSlice.reducer;




// bookingSlice.js
// import { createSlice } from '@reduxjs/toolkit';
// import { doc, setDoc, writeBatch } from 'firebase/firestore';
// import { db } from './firebase'; 

// export const bookingSlice = createSlice({
//   name: 'booking',
//   initialState: {
//     favorites: [],
//     bookings: [],
//   },
//   reducers: {
//     addBooking: (state, action) => {
//       state.bookings.push(action.payload);
//     },
//     addFavorite: (state, action) => {
//       state.favorites.push(action.payload);
//     },
//     setInitialData: (state, action) => {
//       state.bookings = action.payload.bookings;
//       state.favorites = action.payload.favorites;
//     },
//   },
// });

// export const saveBookingToFirestore = (booking) => async (dispatch) => {
//   try {
//     // Assume 'bookings' is the collection name in Firestore
//     await db.collection('bookings').add(booking);
//     dispatch(bookingSlice.actions.addBooking(booking));
//   } catch (error) {
//     console.error('Error saving booking to Firestore:', error);
//   }
// };

// export const { addBooking, addFavorite, setInitialData } = bookingSlice.actions;

// export const saveBulkDataToFirestore = (data) => async (dispatch) => {
//   try {
//     const batch = writeBatch(db);

//     data.bookings.forEach((booking) => {
//       const docRef = doc(db, 'bookings', booking.id.toString());
//       batch.set(docRef, booking);
//     });

//     data.favorites.forEach((favorite) => {
//       const docRef = doc(db, 'favorites', favorite.id.toString());
//       batch.set(docRef, favorite);
//     });

//     await batch.commit();
//     dispatch(setInitialData(data));
//   } catch (error) {
//     console.error("Error adding bulk data: ", error);
//   }
// };



// export default bookingSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';
// import { db } from './firebase';
// import { writeBatch, doc } from 'firebase/firestore';

// const bookingSlice = createSlice({
//   name: 'booking',
//   initialState: {
//     bookings: [],
//     favorites: [],
//   },
//   reducers: {
//     saveBulkDataToFirestore: (state, action) => {
//       // Here you would handle saving the data to Firestore
//     },
//     addFavorite: (state, action) => {
//       state.favorites.push(action.payload);
//     },
//   },
// });

// export const { saveBulkDataToFirestore, addFavorite } = bookingSlice.actions;

// export default bookingSlice.reducer;




// import { createSlice } from '@reduxjs/toolkit';

// const bookingSlice = createSlice({
//   name: 'booking',
//   initialState: {
//     bookings: [],
//     favorites: [],
//   },
//   reducers: {
//     addBooking: (state, action) => {
//       state.bookings.push(action.payload);
//     },
//     addFavorite: (state, action) => {
//       state.favorites.push(action.payload);
//     },
//     setBookings: (state, action) => {
//       state.bookings = action.payload;
//     },
//     setFavorites: (state, action) => {
//       state.favorites = action.payload;
//     },
//   },
// });

// export const { addBooking, addFavorite, setBookings, setFavorites } = bookingSlice.actions;

// export default bookingSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bookings: [],
    favorites: [],
    currentBookingId: null, // Added to keep track of the current booking ID
  },
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
      state.currentBookingId = action.payload.id; // Set the current booking ID
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setCurrentBookingId: (state, action) => {
      state.currentBookingId = action.payload; // Action to set the current booking ID
    },
    resetBookingState: (state) => {
      state.bookings = [];
      state.currentBookingId = null; // Reset the current booking ID
    },
  },
});

export const { addBooking, addFavorite, setBookings, setFavorites, setCurrentBookingId, resetBookingState } = bookingSlice.actions;

export default bookingSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';
// import { db } from './firebase'; // Make sure to import your Firestore instance
// import { collection, addDoc } from 'firebase/firestore'; // Firestore functions

// const bookingSlice = createSlice({
//   name: 'booking',
//   initialState: {
//     bookings: [],
//     favorites: [],
//     currentBookingId: null, // Track the current booking ID
//     accommodation: [], // Add accommodation to the initial state
//   },
//   reducers: {
//     addBooking: (state, action) => {
//       state.bookings.push(action.payload);
//       state.currentBookingId = action.payload.id; // Set the current booking ID
//     },
//     addFavorite: (state, action) => {
//       state.favorites.push(action.payload);
//     },
//     setBookings: (state, action) => {
//       state.bookings = action.payload;
//     },
//     setFavorites: (state, action) => {
//       state.favorites = action.payload;
//     },
//     setCurrentBookingId: (state, action) => {
//       state.currentBookingId = action.payload; // Set the current booking ID
//     },
//     resetBookingState: (state) => {
//       state.bookings = [];
//       state.currentBookingId = null; // Reset the current booking ID
//     },
//     addAccommodation: (state, action) => {
//       state.accommodation.push(action.payload); // Add the accommodation to Redux state
//     },
//   },
// });

// // Action to add accommodation to Firestore
// export const addAccommodationToFirestore = (roomData) => async (dispatch) => {
//   try {
//     // Add the room information to the 'accommodation' collection in Firestore
//     const docRef = await addDoc(collection(db, 'accommodation'), roomData);
    
//     // After pushing to Firestore, update the Redux state
//     dispatch(addAccommodation({ ...roomData, id: docRef.id }));
//   } catch (error) {
//     console.error('Error adding accommodation to Firestore:', error);
//   }
// };

// export const { 
//   addBooking, 
//   addFavorite, 
//   setBookings, 
//   setFavorites, 
//   setCurrentBookingId, 
//   resetBookingState, 
//   addAccommodation // Export the new accommodation action 
// } = bookingSlice.actions;

// export default bookingSlice.reducer;
