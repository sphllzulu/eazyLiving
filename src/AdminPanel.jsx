// src/components/AdminPanel.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccommodations,
  deleteAccommodation,
  updateAccommodation,
} from "./AccomodationSlice";
import {
  fetchBookings,
  cancelBooking,
} from "./BookingSlice";
import { Container, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector((state) => state.accommodations.accommodations);
  const bookings = useSelector((state) => state.bookings.bookings);

  useEffect(() => {
    dispatch(fetchAccommodations());
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleDeleteAccommodation = (id) => {
    dispatch(deleteAccommodation(id));
  };

  const handleDeleteBooking = (id) => {
    dispatch(cancelBooking(id));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>

      <Typography variant="h5">Manage Accommodations</Typography>
      <List>
        {accommodations.map((acc) => (
          <ListItem key={acc.id}>
            <ListItemText
              primary={acc.name}
              secondary={`Price: ${acc.price} | Location: ${acc.location}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleUpdateAccommodation(acc.id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteAccommodation(acc.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Typography variant="h5">Manage Bookings</Typography>
      <List>
        {bookings.map((booking) => (
          <ListItem key={booking.id}>
            <ListItemText
              primary={`Booking ID: ${booking.id}`}
              secondary={`User: ${booking.user.email} | Dates: ${booking.checkIn} - ${booking.checkOut}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteBooking(booking.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AdminPanel;
