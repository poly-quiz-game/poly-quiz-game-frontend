import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
const initialState = {
  userProfile: [],
  count: []
};

export const profile = createAsyncThunk("user/profileUser", async () => {
  return await userApi.getOne();
});

export const fetchCount = createAsyncThunk("user/countUser", async ({start, end}) => {
  return await userApi.getCount({start, end});
});

const userProfileSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(profile.fulfilled, (state, action) => {
      state.userProfile = action.payload
    });
    addCase(fetchCount.fulfilled, (state, action) => {
      state.count = action.payload
    });
  },
});



// Actions
// export const authActions = authSlice.actions;

// Selectors
export const selectUserProfile = (state) => state.userProfile.userProfile;
export const selectUserCount = (state) => state.userProfile.count;

// Reducer
const userProfileReducer = userProfileSlice.reducer;
export default userProfileReducer;
