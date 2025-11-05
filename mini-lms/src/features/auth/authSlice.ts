import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  loading: false,
  error: null,
};

// LOGIN
export const login = createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    const res = await fetch(`http://localhost:4000/users?email=${email}&password=${password}`);
    const data = await res.json();
    if (data.length === 0) return rejectWithValue("Invalid email or password");
    localStorage.setItem("user", JSON.stringify(data[0]));
    return data[0];
  }
);

// REGISTER
export const registerUser = createAsyncThunk<User, { name: string; email: string; password: string }, { rejectValue: string }>(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    const res = await fetch(`http://localhost:4000/users?email=${userData.email}`);
    const exists = await res.json();
    if (exists.length > 0) return rejectWithValue("Email already exists");

    const newUser = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await newUser.json();
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
