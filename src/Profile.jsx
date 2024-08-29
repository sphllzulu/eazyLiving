
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button, Container, Typography } from "@mui/material";
import { updateUserProfile } from "./userSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const dispatch = useDispatch();

  const handleUpdateProfile = () => {
    dispatch(updateUserProfile(displayName));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
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
        value={user?.email || ""}
        disabled
      />
      <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
        Update Profile
      </Button>
    </Container>
  );
};

export default Profile;
