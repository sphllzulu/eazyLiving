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
import userReducer from "../userSlice";
import accommodationReducer from "../AccomodationSlice";
import bookingReducer from "../BookingSlice";
import userSlice from "../userSlice";
import AccomodationSlice from "../AccomodationSlice";
import BookingSlice from "../BookingSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        accommodations: AccomodationSlice,
        bookings: BookingSlice,
    }
});

export default store;

