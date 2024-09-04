import React from "react";
import MenuAppBar from "./Navbar";
import Carousel from "./Carousel";
import BookingComponent from "./Booking";
// import PaymentComponent from "./PaymentComponent";


const Landing = () => {
  return (
    <div>
      <MenuAppBar />
      <Carousel />
      <BookingComponent />
     
    </div>
  );
};

export default Landing;
