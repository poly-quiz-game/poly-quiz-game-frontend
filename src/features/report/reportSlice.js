import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import reportApi from "../../api/reportApi";

const initialState = {
  list: [],
  data: [],
  total: 0,
  report: {},
};

export const fetchReports = createAsyncThunk(
  "report/getAll",
  async ({ offset, limit, search, sortField, sortDirection }) => {
    return await reportApi.getAll({
      offset,
      limit,
      search,
      sortField,
      sortDirection,
    });
  }
);

export const fetchReport = createAsyncThunk("report/getOne", async (id) => {
  return await reportApi.getOne(id);
});

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    resetReports: (state) => {
      state.list = [];
      state.data = [];
      state.total = 0;
    },
  },
  extraReducers: ({ addCase }) => {
    //   Loading
    addCase(fetchReports.pending, (state) => {
      state.list = state.data.concat(
        [...new Array(3)].map(() => ({ loading: true }))
      );
    });
    //   Loading
    addCase(fetchReport.pending, (state) => {});
    //   Success
    addCase(fetchReports.fulfilled, (state, action) => {
      state.data = [...state.data, ...(action.payload.data || [])];
      state.list = state.data;
      state.total = action.payload.total;
    });
    addCase(fetchReport.fulfilled, (state, action) => {
      state.report = action.payload;
    });
    //   Fail
    addCase(fetchReports.rejected, (state) => {});
    addCase(fetchReport.rejected, (state) => {});
  },
});

// Actions
export const reportActions = reportSlice.actions;

// Selectors
export const selectReportList = (state) => state.report.list;
export const selectReportTotal = (state) => state.report.total;
export const selectReport = (state) => state.report.report;

// Reducer
const reportReducer = reportSlice.reducer;
export default reportReducer;
