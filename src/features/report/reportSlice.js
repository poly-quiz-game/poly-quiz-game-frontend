import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import reportApi from "../../api/reportApi";

const initialState = {
  loading: false,
  list: [],
  total: 0,
  report: {},
};

export const fetchReports = createAsyncThunk(
  "report/getAll",
  async ({ sortBy, offset, limit, search }) => {
    const response = await reportApi.getAll({ sortBy, offset, limit, search });
    return response;
  }
);

export const fetchReport = createAsyncThunk("report/getOne", async (id) => {
  const response = await reportApi.getOne(id);
  return response.data;
});

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    resetReports: (state) => {
      state.list = [];
      state.total = 0;
    },
  },
  extraReducers: ({ addCase }) => {
    //   Loading
    addCase(fetchReports.pending, (state) => {
      state.loading = true;
    });
    //   Loading
    addCase(fetchReport.pending, (state) => {
      state.loading = true;
    });
    //   Success
    addCase(fetchReports.fulfilled, (state, action) => {
      state.loading = false;
      state.list = [...state.list, ...action.payload.reports];
      state.total = action.payload.total;
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
export const selectReportTotal = (state) => state.report.total;
export const selectReport = (state) => state.report.report;
export const selectLoading = (state) => state.report.loading;

// Reducer
const reportReducer = reportSlice.reducer;
export default reportReducer;
