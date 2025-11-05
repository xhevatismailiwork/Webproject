    import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
    import type { PayloadAction } from "@reduxjs/toolkit";
    import axios from "axios";

    export interface Profile {
    id: number;
    name: string;
    email: string;
    avatar: string;
    }

    interface ProfileState {
    me: Profile | null;
    loading: boolean;
    error: string | null;
    }

    const initialState: ProfileState = {
    me: null,
    loading: false,
    error: null,
    };

    export const fetchProfile = createAsyncThunk("profile/fetch", async () => {
    const res = await axios.get("http://localhost:4000/me");
    return res.data as Profile;
    });

    export const updateProfile = createAsyncThunk(
    "profile/update",
    async (profile: Profile) => {
        const res = await axios.put(`http://localhost:4000/me`, profile);
        return res.data as Profile;
    }
    );

    const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProfile.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
            state.me = action.payload;
            state.loading = false;
        })
        .addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Error loading profile";
        })
        .addCase(updateProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
            state.me = action.payload;
        });
    },
    });

    export default profileSlice.reducer;
