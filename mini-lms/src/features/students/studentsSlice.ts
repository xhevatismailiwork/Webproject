    // src/features/students/studentsSlice.ts
    import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
    import type { PayloadAction } from "@reduxjs/toolkit";
    import axios from "axios";

    export interface Student {
    id: string;
    name: string;
    email: string;
    program: string;
    status: "Active" | "Inactive";
    tags: string[];
    }

    interface StudentsState {
    items: Student[];
    loading: boolean;
    error: string | null;
    }

    const initialState: StudentsState = {
    items: [],
    loading: false,
    error: null,
    };

    // 👉 Fetch students
    export const fetchStudents = createAsyncThunk("students/fetch", async () => {
    const res = await axios.get("http://localhost:4000/students");
    return res.data;
    });

    // 👉 Add student
    export const addStudent = createAsyncThunk(
    "students/add",
    async (student: Omit<Student, "id">) => {
        const res = await axios.post("http://localhost:4000/students", student);
        return res.data;
    }
    );

    // 👉 Update student
    export const updateStudent = createAsyncThunk(
    "students/update",
    async (student: Student) => {
        const res = await axios.put(
        `http://localhost:4000/students/${student.id}`,
        student
        );
        return res.data;
    }
    );

    // 👉 Delete student
    export const deleteStudent = createAsyncThunk(
        "students/delete",
        async (id: string) => {
            await axios.delete(`http://localhost:4000/students/${id}`);
            return id;
        }
    );

    const studentsSlice = createSlice({
    name: "students",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchStudents.pending, (state) => {
            state.loading = true;
        })
        .addCase(
            fetchStudents.fulfilled,
            (state, action: PayloadAction<Student[]>) => {
            state.items = action.payload;
            state.loading = false;
            }
        )
        .addCase(fetchStudents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch students";
        })

        .addCase(addStudent.fulfilled, (state, action: PayloadAction<Student>) => {
            state.items.push(action.payload);
        })

        .addCase(
            updateStudent.fulfilled,
            (state, action: PayloadAction<Student>) => {
            const idx = state.items.findIndex((s) => s.id === action.payload.id);
            if (idx !== -1) state.items[idx] = action.payload;
            }
        )

        .addCase(
            deleteStudent.fulfilled,
            (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((s) => s.id !== action.payload);
            }
        );
    },
    });

    export default studentsSlice.reducer;
