import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "@/utils/axiosInstance";
import urlHelper from "@/utils/urlHelper";

interface RelatedStyle {
  relatedStyleName: string;
  count: number;
}

interface StyleDetail {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  artistCount: number;
  studioCount: number;
  isFeatured: boolean;
  relatedStyles: RelatedStyle[];
}

interface StyleState {
  current: StyleDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: StyleState = {
  current: null,
  loading: false,
  error: null,
};

export const fetchStyleBySlug = createAsyncThunk(
  "styles/fetchBySlug",
  async (slug: string, { rejectWithValue }) => {
    try {
      const res = await api.get(urlHelper.styles.bySlug(slug));
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to fetch style");
    }
  }
);

const styleSlice = createSlice({
  name: "styles",
  initialState,
  reducers: {
    resetStyle(state) {
      state.current = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStyleBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStyleBySlug.fulfilled, (state, action: PayloadAction<StyleDetail>) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchStyleBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetStyle } = styleSlice.actions;
export default styleSlice.reducer;
