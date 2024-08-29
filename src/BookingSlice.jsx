// src/features/bookingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async () => {
    const querySnapshot = await getDocs(collection(db, "bookings"));
    const bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
    return bookings;
  }
);

export const addBooking = createAsyncThunk(
  "bookings/addBooking",
  async (newBooking) => {
    const docRef = await addDoc(collection(db, "bookings"), newBooking);
    return { id: docRef.id, ...newBooking };
  }
);

export const cancelBooking = createAsyncThunk(
  "bookings/cancelBooking",
  async (id) => {
    const docRef = doc(db, "bookings", id);
    await deleteDoc(docRef);
    return id;
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.status = "succeeded";
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (booking) => booking.id !== action.payload
        );
      });
  },
});

export default bookingSlice.reducer;
