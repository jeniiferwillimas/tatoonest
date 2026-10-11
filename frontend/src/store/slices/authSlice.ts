import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "@/utils/axiosInstance";
import urlHelper from "@/utils/urlHelper";

interface User {
  userId: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: { name: string; email: string; password: string; role?: string }, { rejectWithValue }) => {
    try {
      const res = await api.post(urlHelper.auth.register, data);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.post(urlHelper.auth.login, data);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Login failed");
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (credential: string, { rejectWithValue }) => {
    try {
      const res = await api.post(urlHelper.auth.google, { credential });
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Google login failed");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      const res = await api.post(urlHelper.auth.forgotPassword, data);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Request failed");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data: { email: string; token: string; newPassword: string }, { rejectWithValue }) => {
    try {
      const res = await api.post(urlHelper.auth.resetPassword, data);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Reset failed");
    }
  }
);

type AuthPayload = { token: string; email: string; name: string; userId: string; role: string };

function setAuthState(state: AuthState, payload: AuthPayload) {
  state.loading = false;
  state.token = payload.token;
  state.user = {
    userId: payload.userId,
    email: payload.email,
    name: payload.name,
    role: payload.role || "NormalUser",
  };
  if (typeof window !== "undefined") {
    localStorage.setItem("token", payload.token);
    localStorage.setItem("user", JSON.stringify(state.user));
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
    loadFromStorage(state) {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (token && user) {
          state.token = token;
          state.user = JSON.parse(user);
        }
      }
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthPayload>) => { setAuthState(state, action.payload); })
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthPayload>) => { setAuthState(state, action.payload); })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(googleLogin.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(googleLogin.fulfilled, (state, action: PayloadAction<AuthPayload>) => { setAuthState(state, action.payload); })
      .addCase(googleLogin.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(forgotPassword.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(forgotPassword.fulfilled, (state) => { state.loading = false; })
      .addCase(forgotPassword.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(resetPassword.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(resetPassword.fulfilled, (state) => { state.loading = false; })
      .addCase(resetPassword.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export const { logout, loadFromStorage, clearError } = authSlice.actions;
export default authSlice.reducer;
