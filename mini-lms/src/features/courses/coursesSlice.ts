import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  credits: number;
}

interface CoursesState {
  items: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  items: [],
  loading: false,
  error: null,
};

// 👉 Fetch courses
export const fetchCourses = createAsyncThunk("courses/fetchCourses", async () => {
  const res = await axios.get("http://localhost:4000/courses");
  return res.data;
});

// 👉 Add course
export const addCourse = createAsyncThunk(
  "courses/addCourse",
  async (course: Omit<Course, "id">) => {
    const res = await axios.post("http://localhost:4000/courses", course);
    return res.data;
  }
);

// 👉 Update course
export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async (course: Course) => {
    const res = await axios.put(
      `http://localhost:4000/courses/${course.id}`,
      course
    );
    return res.data;
  }
);

// 👉 Delete course
export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (id: number) => {
    await axios.delete(`http://localhost:4000/courses/${id}`);
    return id;
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {}, // nuk ke reducers normale tani
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCourses.fulfilled,
        (state, action: PayloadAction<Course[]>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching courses";
      })

      // add
      .addCase(addCourse.fulfilled, (state, action: PayloadAction<Course>) => {
        state.items.push(action.payload);
      })

      // update
      .addCase(
        updateCourse.fulfilled,
        (state, action: PayloadAction<Course>) => {
          const index = state.items.findIndex(
            (c) => c.id === action.payload.id
          );
          if (index !== -1) state.items[index] = action.payload;
        }
      )

      // delete
      .addCase(
        deleteCourse.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter((c) => c.id !== action.payload);
        }
      );
  },
});

// ❌ hiqe këtë linjë: export const { addCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
