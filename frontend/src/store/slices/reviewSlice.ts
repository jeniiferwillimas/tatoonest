import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "@/utils/axiosInstance";
import urlHelper from "@/utils/urlHelper";

export interface ReviewItem {
  id: number;
  rating: number;
  content: string;
  reply: string | null;
  repliedAt: string | null;
  createdAt: string;
  userName?: string;
  artistName?: string;
  artistSlug?: string;
}

interface ReviewState {
  list: ReviewItem[];
  averageRating: number;
  totalReviews: number;
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  list: [],
  averageRating: 0,
  totalReviews: 0,
  loading: false,
  error: null,
};

export const fetchReceivedReviews = createAsyncThunk(
  "reviews/fetchReceived",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(urlHelper.reviews.received);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to fetch reviews");
    }
  }
);

export const fetchMyReviews = createAsyncThunk(
  "reviews/fetchMy",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(urlHelper.reviews.myReviews);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to fetch reviews");
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReceivedReviews.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchReceivedReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.reviews;
        state.averageRating = action.payload.averageRating;
        state.totalReviews = action.payload.totalReviews;
      })
      .addCase(fetchReceivedReviews.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(fetchMyReviews.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMyReviews.fulfilled, (state, action: PayloadAction<ReviewItem[]>) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchMyReviews.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export default reviewSlice.reducer;
