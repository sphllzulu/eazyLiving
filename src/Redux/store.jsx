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
import profileSlice from "../profileSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        payment:paymentSlice,
        bookings: BookingSlice,
        profile:profileSlice,
    }
});

export default store;

