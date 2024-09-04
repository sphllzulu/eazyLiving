import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import './SignUp.css';
import { useNavigate } from "react-router-dom"; 
import { registerUser, updateUserProfile } from "./userSlice";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleSignUp = async () => {
    try {
      const resultAction = await dispatch(registerUser({ displayName,email, password }));

      if (registerUser.fulfilled.match(resultAction)) {
        // If the sign-up was successful, update the user's profile
        await dispatch(updateUserProfile({ displayName }));
        
        // Navigate to login page after successful registration
        navigate("/login");
      } else {
        setError(resultAction.payload || "Failed to sign up");
      }
    } catch (err) {
      setError(err.message || "Failed to sign up");
    }
  };

  return (
    <div className="flex">
    <Container maxWidth="sm" className="container">
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        
      />
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
      <Button variant="contained" color="primary" onClick={handleSignUp}>
        Sign Up
      </Button>
    </Container>
    </div>
  );
};

export default SignUp;
