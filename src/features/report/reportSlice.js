import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import quizApi from "../../api/quizApi";

const initialState = {
  loading: false,
  list: [],
  quiz: {},
};

export const fetchQuizzes = createAsyncThunk("quiz/getAll", async () => {
  const response = await quizApi.getAll();
  return response.data;
});

export const fetchQuiz = createAsyncThunk("quiz/getOne", async (id) => {
  console.log(111);
  const response = await quizApi.getOne(id);
  console.log(response);
  return response.data;
});

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    //   Loading
    addCase(fetchQuizzes.pending, (state, action) => {
      state.loading = true;
    });
    //   Loading
    addCase(fetchQuiz.pending, (state, action) => {
      state.loading = true;
    });
    //   Success
    addCase(fetchQuizzes.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });
    addCase(fetchQuiz.fulfilled, (state, action) => {
      state.loading = false;
      state.quiz = action.payload;
    });
    //   Fail
    addCase(fetchQuizzes.rejected, (state, action) => {
      state.loading = false;
    });
    addCase(fetchQuiz.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

// Actions
export const quizActions = quizSlice.actions;

// Selectors
export const selectQuizList = (state) => state.quiz.list;
export const selectQuiz = (state) => state.quiz.quiz;
export const selectLoading = (state) => state.quiz.loading;

// Reducer
const quizReducer = quizSlice.reducer;
export default quizReducer;
