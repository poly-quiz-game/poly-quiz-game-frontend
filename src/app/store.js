import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/rooms/roomSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
