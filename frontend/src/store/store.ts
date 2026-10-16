import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import moduleReducer from "./slices/moduleSlice";
import landingReducer from "./slices/landingSlice";
import styleReducer from "./slices/styleSlice";
import artistReducer from "./slices/artistSlice";
import artistProfileReducer from "./slices/artistProfileSlice";
import bookingReducer from "./slices/bookingSlice";
import messageReducer from "./slices/messageSlice";
import reviewReducer from "./slices/reviewSlice";
import savedReducer from "./slices/savedSlice";
import paymentReducer from "./slices/paymentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modules: moduleReducer,
    landing: landingReducer,
    styles: styleReducer,
    artists: artistReducer,
    artistProfile: artistProfileReducer,
    bookings: bookingReducer,
    messages: messageReducer,
    reviews: reviewReducer,
    saved: savedReducer,
    payments: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
