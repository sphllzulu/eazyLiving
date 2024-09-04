

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth,db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

// Helper function to extract serializable user data
const extractUserData = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName || "",
});

// Async thunk for registering a user
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName || "",
        createdAt: Timestamp.now(),
      });

      return extractUserData(user);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for logging in a user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return extractUserData(userCredential.user);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for logging out a user
export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  await signOut(auth);
});

// Async thunk for updating the user's profile
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({ displayName }, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No user is currently signed in.");
      }

      await updateProfile(user, { displayName });
      return { displayName };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        if (state.user) {
          state.user.displayName = action.payload.displayName;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;