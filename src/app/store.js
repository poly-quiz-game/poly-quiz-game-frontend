import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../features/quiz/quizSlice";
import authReducer from "../features/auth/authSlice";
import reportReducer from "../features/report/reportSlice";
import userProfileReducer from "../features/userProfile/userProfileSlice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    auth: authReducer,
    report: reportReducer,
    userProfile: userProfileReducer,
  },
});
