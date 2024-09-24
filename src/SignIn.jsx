import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./userSlice";
import GoogleIcon from "@mui/icons-material/Google";
import CloseIcon from "@mui/icons-material/Close";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSignIn = async () => {
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/");
      } else {
        setError(resultAction.payload || "Failed to sign in");
      }
    } catch (err) {
      setError(err.message || "Failed to sign in");
    }
  };

  return (
    <div className="cont">
      <Container
        maxWidth={false}
        sx={{
          height: "100vh", 
          width: "100vw", 
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          padding: "20px",
        }}
      >
        {/* Left side image */}
        {!isMobile && (
          <Box
            sx={{
              flex: 1,
              backgroundImage: 'url("hotel.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "96%",
              borderRadius: "10px 0 0 10px",
            }}
          />
        )}

        {/* Sign-in form */}
        <Box
          sx={{
            flex: 1,
            padding: "20px",
            maxWidth: "400px",
            position: "relative",
            backgroundColor: "#fff",
            opacity: "0.8",
            borderRadius: isMobile ? "10px" : "0 10px 10px 0",
            height: isMobile ? "auto" : "510px",
          }}
        >
          {/* Close Icon */}
          <IconButton
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "#000",
            }}
            onClick={() => navigate("/")}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "#000", textAlign: "center" }}
          >
            Login
          </Typography>

          {error && (
            <Typography color="error" variant="body2" gutterBottom align="center">
              {error}
            </Typography>
          )}

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

          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#6a0dad",
              color: "#fff",
              padding: "12px",
              borderRadius: "30px",
              margin: "20px 0",
              "&:hover": { backgroundColor: "#4a0072" },
            }}
            onClick={handleSignIn}
          >
            Log In
          </Button>

          <Typography align="center" sx={{ margin: "10px 0" }}>
            Or Continue With
          </Typography>

          {/* Social login options */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <IconButton sx={{ color: "#DB4437" }}>
              <GoogleIcon />
            </IconButton>
          </Box>

          <Typography align="center">
            Don’t have an account?{" "}
            <Button
              onClick={() => navigate("/signup")}
              sx={{ padding: 0, color: "#6a0dad" }}
            >
              Sign Up Here
            </Button>
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default SignIn;
