import React from "react";
import MenuAppBar from "./Navbar";
import Carousel from "./Carousel";
import BookingComponent from "./Booking";
import HotelAmenities from "./Hotel Amenities";
// import PaymentComponent from "./PaymentComponent";


const Landing = () => {
  return (
    <div>
      <MenuAppBar />
      <Carousel />
      <HotelAmenities/>
      <BookingComponent />
     
    </div>
  );
};

export default Landing;
