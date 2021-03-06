import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import quizApi from "api/quizApi";

const initialState = {
  loading: false,
  list: [],
  quiz: {},
};

export const fetchQuizzes = createAsyncThunk("quiz/getAll", async () => {
  await setTimeout(() => {}, 2000);
  const response = await quizApi.getAll();
  return response.data;
});

export const fetchQuiz = createAsyncThunk("quiz/getOne", async (id) => {
  return await quizApi.getOne(id);
});

export const fetchCreateQuiz = createAsyncThunk("quiz/create", async (quiz) => {
  return await quizApi.create(quiz);
});

export const fetchUpdateQuiz = createAsyncThunk("quiz/update", async (quiz) => {
  return await quizApi.update(quiz);
});

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    //   Loading
    addCase(fetchQuizzes.pending, (state) => {
      state.loading = true;
    });
    //   Loading
    addCase(fetchQuiz.pending, (state) => {
      state.loading = true;
    });
    addCase(fetchCreateQuiz.pending, (state) => {
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
    addCase(fetchCreateQuiz.fulfilled, (state, action) => {
      state.loading = false;
      state.quiz = action.payload;
    });
    //   Fail
    addCase(fetchQuizzes.rejected, (state) => {
      state.loading = false;
    });
    addCase(fetchQuiz.rejected, (state) => {
      state.loading = false;
    });
    addCase(fetchCreateQuiz.rejected, (state) => {
      state.loading = false;
    });
    addCase(remove.rejected, (state) => {
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
