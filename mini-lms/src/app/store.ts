import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import studentsReducer from "../features/students/studentsSlice";
import coursesReducer from "../features/courses/coursesSlice";
import enrollmentsReducer from "../features/enrollments/enrollmentsSlice";
import profileReducer from "../features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
    courses: coursesReducer,
    enrollments: enrollmentsReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
