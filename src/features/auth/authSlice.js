import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "api/authApi";
import { push } from "redux-first-history";

const initialState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
};

export const fetchLogin = createAsyncThunk("auth/login", async (payload) => {
  const response = await authApi.login(payload);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(fetchLogin.fulfilled, (state, action) => {
      console.log(333, state);
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload;
    });
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLogging = (state) => state.auth.logging;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
