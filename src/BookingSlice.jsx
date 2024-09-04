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
import { createSlice } from '@reduxjs/toolkit';
import { doc, setDoc, writeBatch } from 'firebase/firestore';
import { db } from './firebase'; 

export const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    favorites: [],
    bookings: [],
  },
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    setInitialData: (state, action) => {
      state.bookings = action.payload.bookings;
      state.favorites = action.payload.favorites;
    },
  },
});

export const saveBookingToFirestore = (booking) => async (dispatch) => {
  try {
    // Assume 'bookings' is the collection name in Firestore
    await db.collection('bookings').add(booking);
    dispatch(bookingSlice.actions.addBooking(booking));
  } catch (error) {
    console.error('Error saving booking to Firestore:', error);
  }
};

export const { addBooking, addFavorite, setInitialData } = bookingSlice.actions;

export const saveBulkDataToFirestore = (data) => async (dispatch) => {
  try {
    const batch = writeBatch(db);

    data.bookings.forEach((booking) => {
      const docRef = doc(db, 'bookings', booking.id.toString());
      batch.set(docRef, booking);
    });

    data.favorites.forEach((favorite) => {
      const docRef = doc(db, 'favorites', favorite.id.toString());
      batch.set(docRef, favorite);
    });

    await batch.commit();
    dispatch(setInitialData(data));
  } catch (error) {
    console.error("Error adding bulk data: ", error);
  }
};



export default bookingSlice.reducer;