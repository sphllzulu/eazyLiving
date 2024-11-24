import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, updateUserProfile } from "./userSlice";
import CloseIcon from "@mui/icons-material/Close";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setLoading(true); 
    setError(null);

    try {
      const resultAction = await dispatch(registerUser({ displayName, email, password }));

      if (registerUser.fulfilled.match(resultAction)) {
        await dispatch(updateUserProfile({ displayName }));
        navigate("/login");
      } else {
        setError(resultAction.payload || "Failed to sign up");
      }
    } catch (err) {
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh", 
        width: "100vw",  
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Left side image */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: 'url("hotela.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: { xs: "200px", md: "93%" },
          width: "100%",
          borderRadius: { md: "10px 0 0 10px", xs: "10px" },
        }}
      />

      {/* Sign-up form */}
      <Box
        sx={{
          flex: 1,
          padding: "20px",
          position: "relative",
          backgroundColor: "#fff",
          borderRadius: { md: "0 10px 10px 0", xs: "10px" },
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          maxWidth: { xs: "100%", md: "400px" },
        }}
      >
        {/* Close Icon */}
        <IconButton
          sx={{ position: "absolute", top: "10px", right: "10px" }}
          onClick={() => navigate("/")}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h4" gutterBottom sx={{ color: "#000", textAlign: "center" }}>
          Sign Up
        </Typography>

        {error && (
          <Typography color="error" variant="body2" gutterBottom>
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
          InputProps={{
            sx: { borderRadius: "30px", padding: "10px" },
          }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            sx: { borderRadius: "30px", padding: "10px" },
          }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            sx: { borderRadius: "30px", padding: "10px" },
          }}
        />

        <Box sx={{ position: "relative", width: "100%" }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#6a1b9a",
              color: "#fff",
              padding: "12px",
              borderRadius: "30px",
              margin: "20px 0",
              "&:hover": { backgroundColor: "#4a0072" },
            }}
            onClick={handleSignUp}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Sign Up"
            )}
          </Button>
        </Box>

        <Typography align="center" sx={{ margin: "10px 0" }}>
          Already have an account?{" "}
          <Button onClick={() => navigate("/login")} sx={{ padding: 0, color: "#6a1b9a" }}>
            Log In Here
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;
