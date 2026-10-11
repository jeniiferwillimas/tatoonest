import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "@/utils/axiosInstance";
import urlHelper from "@/utils/urlHelper";

export interface Module {
  id: number;
  name: string;
  textId: string;
  description: string | null;
  header: string | null;
  urlPath: string | null;
  icon: string | null;
  orderNo: number;
  parentId: number | null;
  children: Module[];
}

interface ModuleState {
  modules: Module[];
  loading: boolean;
  error: string | null;
}

const initialState: ModuleState = {
  modules: [],
  loading: false,
  error: null,
};

export const getUserAuthorizedModules = createAsyncThunk(
  "modules/getAuthorized",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(urlHelper.module.authorized);
      return res.data.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to fetch modules");
    }
  }
);

const moduleSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    resetModules(state) {
      state.modules = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAuthorizedModules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAuthorizedModules.fulfilled, (state, action: PayloadAction<Module[]>) => {
        state.loading = false;
        state.modules = action.payload;
      })
      .addCase(getUserAuthorizedModules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetModules } = moduleSlice.actions;
export default moduleSlice.reducer;
