// import React, { useState } from "react";
// import { TextField, Button, Container, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";

// import { useNavigate } from "react-router-dom";
// import { loginUser } from "./userSlice";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null); // State for error handling
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Initialize useNavigate

//   // Get the user and error state from Redux
//   const user = useSelector((state) => state.user.user);
//   const authError = useSelector((state) => state.user.error);

//   const handleSignIn = async () => {
//     try {
//       const resultAction = await dispatch(loginUser({ email, password }));
//       console.log("Result Action:", resultAction);

//       if (loginUser.fulfilled.match(resultAction)) {
//         console.log("Login succeeded, user:", resultAction.payload);
//         // Navigate to home page upon successful sign-in
//         navigate("/");
//       } else {
//         setError(resultAction.payload || "Failed to sign in");
//       }
//     } catch (err) {
//       setError(err.message || "Failed to sign in");
//     }
//   };

//   return (
//     <div className="flex">
//     <Container maxWidth="sm" className="container">
//       <Typography variant="h4" gutterBottom>
//         Sign In
//       </Typography>
//       {error && (
//         <Typography color="error" variant="body2">
//           {error}
//         </Typography>
//       )}
//       {authError && (
//         <Typography color="error" variant="body2">
//           {authError}
//         </Typography>
//       )}
//       <TextField
//         label="Email"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <TextField
//         label="Password"
//         type="password"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <Button variant="contained" color="primary" onClick={handleSignIn}>
//         Sign In
//       </Button>
//     </Container>
//     </div>
//   );
// };

// export default SignIn;



// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   Box,
//   IconButton,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "./userSlice";
// import GoogleIcon from "@mui/icons-material/Google";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import AppleIcon from "@mui/icons-material/Apple";
// import CloseIcon from "@mui/icons-material/Close";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSignIn = async () => {
//     try {
//       const resultAction = await dispatch(loginUser({ email, password }));
//       if (loginUser.fulfilled.match(resultAction)) {
//         navigate("/");
//       } else {
//         setError(resultAction.payload || "Failed to sign in");
//       }
//     } catch (err) {
//       setError(err.message || "Failed to sign in");
//     }
//   };

//   return (
//     <Container
//       maxWidth="md"
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "20px",
//         backgroundColor: "#fff",
//         borderRadius: "10px",
//         boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       {/* Left side image */}
//       <Box
//         sx={{
//           flex: 1,
//           backgroundImage: 'url("hotel.jpg")',
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           height: "400px",
//         }}
//       />

//       {/* Sign-in form */}
//       <Box sx={{ flex: 1, padding: "0 20px", position: "relative" }}>
//         {/* Close Icon */}
//         <IconButton
//           sx={{ position: "absolute", top: "10px", right: "10px" }}
//           onClick={() => navigate("/")}
//         >
//           <CloseIcon />
//         </IconButton>

//         <Typography variant="h4" gutterBottom>
//           Login
//         </Typography>

//         {error && (
//           <Typography color="error" variant="body2" gutterBottom>
//             {error}
//           </Typography>
//         )}

//         <TextField
//           label="Email"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           InputProps={{
//             sx: { borderRadius: "30px", padding: "10px" },
//           }}
//         />
//         <TextField
//           label="Password"
//           type="password"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           InputProps={{
//             sx: { borderRadius: "30px", padding: "10px" },
//           }}
//         />

//         <Button
//           variant="contained"
//           fullWidth
//           sx={{
//             backgroundColor: "#ff6b6b",
//             color: "#fff",
//             padding: "12px",
//             borderRadius: "30px",
//             margin: "20px 0",
//             "&:hover": { backgroundColor: "#ff5252" },
//           }}
//           onClick={handleSignIn}
//         >
//           Log In
//         </Button>

//         <Typography align="center" sx={{ margin: "10px 0" }}>
//           Or Continue With
//         </Typography>

//         {/* Social login options */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "10px",
//             marginBottom: "20px",
//           }}
//         >
//           <IconButton sx={{ color: "#DB4437" }}>
//             <GoogleIcon />
//           </IconButton>
//           <IconButton sx={{ color: "#4267B2" }}>
//             <FacebookIcon />
//           </IconButton>
//           <IconButton sx={{ color: "#000000" }}>
//             <AppleIcon />
//           </IconButton>
//         </Box>

//         <Typography align="center">
//           Don’t have an account?{" "}
//           <Button onClick={() => navigate("/signup")} sx={{ padding: 0 }}>
//             Sign Up Here
//           </Button>
//         </Typography>
//       </Box>
//     </Container>
//   );
// };

// export default SignIn;


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
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
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
      maxWidth={isMobile ? "xs" : "md"}
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
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
            height: "510px",
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
          opacity:'0.8',
          borderRadius: "0 10px 10px 0",
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
          <Button onClick={() => navigate("/signup")} sx={{ padding: 0, color: "#6a0dad" }}>
            Sign Up Here
          </Button>
        </Typography>
      </Box>
    </Container>
</div>
  );
};

export default SignIn;
