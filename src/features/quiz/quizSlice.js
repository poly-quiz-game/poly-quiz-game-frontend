import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import quizApi from "api/quizApi";

const initialState = {
  data: [],
  list: [],
  total: 0,
  quiz: {},
};

export const fetchQuizzes = createAsyncThunk(
  "quiz/getAll",
  async ({ offset, limit, search, sortField, sortDirection }) => {
    return await quizApi.getAll({
      offset,
      limit,
      search,
      sortField,
      sortDirection,
    });
  }
);

export const fetchQuiz = createAsyncThunk("quiz/getOne", async (id) => {
  return await quizApi.getOne(id);
});
export const remove = createAsyncThunk(
  "quiz/remove",
  async (id) => {
    const { data } = await quizApi.delete(id);
    return data;
});

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    resetQuizzes: (state) => {
      state.list = [];
      state.data = [];
      state.total = 0;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(fetchQuizzes.pending, (state) => {
      state.list = state.data.concat(
        [...new Array(3)].map(() => ({ loading: true }))
      );
    });
    addCase(fetchQuiz.pending, (state) => {});
    addCase(fetchQuizzes.fulfilled, (state, action) => {
      state.data = [...state.data, ...action.payload.data];
      state.list = state.data;
      state.total = action.payload.total;
    });
    addCase(fetchQuiz.fulfilled, (state, action) => {
      state.quiz = action.payload;
    });
    addCase(fetchQuizzes.rejected, (state) => {});
    addCase(fetchQuiz.rejected, (state) => {});
  },
});

// Actions
export const quizActions = quizSlice.actions;

// Selectors
export const selectQuizList = (state) => state.quiz.list;
export const selectQuizTotal = (state) => state.quiz.total;
export const selectQuiz = (state) => state.quiz.quiz;

// Reducer
const quizReducer = quizSlice.reducer;
export default quizReducer;
