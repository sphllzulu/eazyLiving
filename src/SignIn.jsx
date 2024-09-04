import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { loginUser } from "./userSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State for error handling
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  // Get the user and error state from Redux
  const user = useSelector((state) => state.user.user);
  const authError = useSelector((state) => state.user.error);

  const handleSignIn = async () => {
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      console.log("Result Action:", resultAction);

      if (loginUser.fulfilled.match(resultAction)) {
        console.log("Login succeeded, user:", resultAction.payload);
        // Navigate to home page upon successful sign-in
        navigate("/");
      } else {
        setError(resultAction.payload || "Failed to sign in");
      }
    } catch (err) {
      setError(err.message || "Failed to sign in");
    }
  };

  return (
    <div className="flex">
    <Container maxWidth="sm" className="container">
      <Typography variant="h4" gutterBottom>
        Sign In
      </Typography>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      {authError && (
        <Typography color="error" variant="body2">
          {authError}
        </Typography>
      )}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSignIn}>
        Sign In
      </Button>
    </Container>
    </div>
  );
};

export default SignIn;
