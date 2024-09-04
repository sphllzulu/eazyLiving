// import { configureStore } from "@reduxjs/toolkit";

// const store = configureStore({
//     reducer: {
//          user:userReducer,
//      accommodations: accommodationReducer,
//      bookings: bookingReducer,
//     }
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../userSlice";
// import AccomodationSlice from "../AccomodationSlice";
import BookingSlice from "../BookingSlice";
import paymentSlice from "../paymentSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        payment:paymentSlice,
        bookings: BookingSlice,
    }
});

export default store;

