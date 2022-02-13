import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import reportApi from "../../api/reportApi";

const initialState = {
  loading: false,
  list: [],
  report: {},
};

export const fetchReports = createAsyncThunk("report/getAll", async () => {
  const response = await reportApi.getAll();
  console.log(response)
  return response.data;
});

export const fetchReport = createAsyncThunk("report/getOne", async (id) => {
  const response = await reportApi.getOne(id);
  return response.data;
});

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    //   Loading
    addCase(fetchReports.pending, (state, action) => {
      state.loading = true;
    });
    //   Loading
    addCase(fetchReport.pending, (state, action) => {
      state.loading = true;
    });
    //   Success
    addCase(fetchReports.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });
    addCase(fetchReport.fulfilled, (state, action) => {
      state.loading = false;
      state.report = action.payload;
    });
    //   Fail
    addCase(fetchReports.rejected, (state, action) => {
      state.loading = false;
    });
    addCase(fetchReport.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

// Actions
export const reportActions = reportSlice.actions;

// Selectors
export const selectReportList = (state) => state.report.list;
export const selectReport = (state) => state.report.report;
export const selectLoading = (state) => state.report.loading;

// Reducer
const reportReducer = reportSlice.reducer;
export default reportReducer;
