



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase'; // Assuming you have Firestore set up in firebase.js

const convertTimestampsToISO = (data) => {
  return data.map(item => {
    const convertedItem = { ...item };

    // Iterate over all properties and convert any Firebase Timestamps to ISO strings
    Object.keys(convertedItem).forEach(key => {
      if (convertedItem[key]?.toDate) {
        convertedItem[key] = convertedItem[key].toDate().toISOString();
      }
    });

    return convertedItem;
  });
};

export const fetchBookings = createAsyncThunk(
  'profile/fetchBookings',
  async (userId, { rejectWithValue }) => {
    try {
      const bookingsRef = collection(db, 'bookings');
      const q = query(bookingsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      const bookings = [];
      querySnapshot.forEach((doc) => {
        bookings.push({ id: doc.id, ...doc.data() });
      });
      
      // Convert timestamps to serializable format
      return convertTimestampsToISO(bookings);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  'profile/fetchFavorites',
  async (userId, { rejectWithValue }) => {
    try {
      const favoritesRef = collection(db, 'favorites');
      const q = query(favoritesRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      const favorites = [];
      querySnapshot.forEach((doc) => {
        favorites.push({ id: doc.id, ...doc.data() });
      });

      // Convert timestamps to serializable format
      return convertTimestampsToISO(favorites);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  bookings: [],
  favorites: [],
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfileState: (state) => {
      state.bookings = [];
      state.favorites = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchBookings
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle fetchFavorites
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProfileState } = profileSlice.actions;

export default profileSlice.reducer;
