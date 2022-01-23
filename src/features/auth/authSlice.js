import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "api/authApi";

const initialState = {
  token: localStorage.getItem("access_token") || "",
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
};

export const fetchLogin = createAsyncThunk("auth/login", async (payload) => {
  return await authApi.login(payload);
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
    addCase(fetchLogin.pending, (state) => {
      state.logging = true;
    });
    addCase(fetchLogin.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.logging = false;
      state.token = action.payload.token;
      state.currentUser = action.payload.user;
      localStorage.setItem("access_token", action.payload.token);
    });
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLogging = (state) => state.auth.logging;
export const selectToken = (state) => state.auth.token;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
