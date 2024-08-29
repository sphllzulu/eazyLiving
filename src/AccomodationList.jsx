// src/components/AccommodationList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccommodations } from "./AccomodationSlice";
import { Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

const AccommodationList = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector((state) => state.accommodations.accommodations);

  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  return (
    <Grid container spacing={4}>
      {accommodations.map((acc) => (
        <Grid item xs={12} sm={6} md={4} key={acc.id}>
          <Card>
            <CardMedia
              component="img"
              alt={acc.name}
              height="140"
              image={acc.imageUrl}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {acc.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {acc.description}
              </Typography>
              <Button variant="contained" color="primary">
                Book Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AccommodationList;
