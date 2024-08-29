// src/features/accommodationSlice.js
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

export const fetchAccommodations = createAsyncThunk(
  "accommodations/fetchAccommodations",
  async () => {
    const querySnapshot = await getDocs(collection(db, "accommodations"));
    const accommodations = [];
    querySnapshot.forEach((doc) => {
      accommodations.push({ id: doc.id, ...doc.data() });
    });
    return accommodations;
  }
);

export const addAccommodation = createAsyncThunk(
  "accommodations/addAccommodation",
  async (newAccommodation) => {
    const docRef = await addDoc(
      collection(db, "accommodations"),
      newAccommodation
    );
    return { id: docRef.id, ...newAccommodation };
  }
);

export const updateAccommodation = createAsyncThunk(
  "accommodations/updateAccommodation",
  async ({ id, updatedData }) => {
    const docRef = doc(db, "accommodations", id);
    await updateDoc(docRef, updatedData);
    return { id, updatedData };
  }
);

export const deleteAccommodation = createAsyncThunk(
  "accommodations/deleteAccommodation",
  async (id) => {
    const docRef = doc(db, "accommodations", id);
    await deleteDoc(docRef);
    return id;
  }
);

const accommodationSlice = createSlice({
  name: "accommodations",
  initialState: {
    accommodations: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccommodations.fulfilled, (state, action) => {
        state.accommodations = action.payload;
        state.status = "succeeded";
      })
      .addCase(addAccommodation.fulfilled, (state, action) => {
        state.accommodations.push(action.payload);
      })
      .addCase(updateAccommodation.fulfilled, (state, action) => {
        const index = state.accommodations.findIndex(
          (acc) => acc.id === action.payload.id
        );
        if (index !== -1) {
          state.accommodations[index] = {
            ...state.accommodations[index],
            ...action.payload.updatedData,
          };
        }
      })
      .addCase(deleteAccommodation.fulfilled, (state, action) => {
        state.accommodations = state.accommodations.filter(
          (acc) => acc.id !== action.payload
        );
      });
  },
});

export default accommodationSlice.reducer;
