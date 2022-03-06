import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import quizApi from "api/quizApi";

const initialState = {
  loading: false,
  list: [],
  total: 0,
  quiz: {},
};

export const fetchQuizzes = createAsyncThunk(
  "quiz/getAll",
  async ({ offset, limit, search, sortBy }) => {
    return await quizApi.getAll({ offset, limit, search, sortBy });
  }
);

export const fetchQuiz = createAsyncThunk("quiz/getOne", async (id) => {
  const response = await quizApi.getOne(id);
  return response.data;
});

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    resetQuizzes: (state) => {
      state.list = [];
      state.total = 0;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(fetchQuizzes.pending, (state) => {
      state.loading = true;
    });
    addCase(fetchQuiz.pending, (state) => {
      state.loading = true;
    });
    addCase(fetchQuizzes.fulfilled, (state, action) => {
      state.loading = false;
      state.list = [...state.list, ...action.payload.quizzes];
      state.total = action.payload.total;
    });
    addCase(fetchQuiz.fulfilled, (state, action) => {
      state.loading = false;
      state.quiz = action.payload;
    });
    addCase(fetchQuizzes.rejected, (state) => {
      state.loading = false;
    });
    addCase(fetchQuiz.rejected, (state) => {
      state.loading = false;
    });
  },
});

// Actions
export const quizActions = quizSlice.actions;

// Selectors
export const selectQuizList = (state) => state.quiz.list;
export const selectQuizTotal = (state) => state.quiz.total;
export const selectQuiz = (state) => state.quiz.quiz;
export const selectLoading = (state) => state.quiz.loading;

// Reducer
const quizReducer = quizSlice.reducer;
export default quizReducer;
