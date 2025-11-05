    // src/features/enrollments/enrollmentsSlice.ts
    import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
    import type { PayloadAction } from "@reduxjs/toolkit";
    import axios from "axios";

    export interface Enrollment {
    id: number;
    studentId: number;
    courseId: number;
    enrolledAt: string;
    progress: number;
    status: "Enrolled" | "Completed" | "Dropped";
    }

    interface EnrollmentsState {
    items: Enrollment[];
    loading: boolean;
    error: string | null;
    }

    const initialState: EnrollmentsState = {
    items: [],
    loading: false,
    error: null,
    };

    // Fetch all
    export const fetchEnrollments = createAsyncThunk("enrollments/fetch", async () => {
    const res = await axios.get("http://localhost:4000/enrollments");
    return res.data as Enrollment[];
    });

    // Add
    export const addEnrollment = createAsyncThunk(
    "enrollments/add",
    async (enrollment: Omit<Enrollment, "id">) => {
        const res = await axios.post("http://localhost:4000/enrollments", enrollment);
        return res.data as Enrollment;
    }
    );

    // Update
    export const updateEnrollment = createAsyncThunk(
    "enrollments/update",
    async (enrollment: Enrollment) => {
        const res = await axios.put(`http://localhost:4000/enrollments/${enrollment.id}`, enrollment);
        return res.data as Enrollment;
    }
    );

    // Delete
    export const deleteEnrollment = createAsyncThunk("enrollments/delete", async (id: number) => {
    await axios.delete(`http://localhost:4000/enrollments/${id}`);
    return id;
    });

    const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchEnrollments.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchEnrollments.fulfilled, (state, action: PayloadAction<Enrollment[]>) => {
            state.items = action.payload;
            state.loading = false;
        })
        .addCase(fetchEnrollments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Error loading enrollments";
        })
        .addCase(addEnrollment.fulfilled, (state, action: PayloadAction<Enrollment>) => {
            state.items.push(action.payload);
        })
        .addCase(updateEnrollment.fulfilled, (state, action: PayloadAction<Enrollment>) => {
            const i = state.items.findIndex((e) => e.id === action.payload.id);
            if (i !== -1) state.items[i] = action.payload;
        })
        .addCase(deleteEnrollment.fulfilled, (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((e) => e.id !== action.payload);
        });
    },
    });

    export default enrollmentsSlice.reducer;
