import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "@/utils/axiosInstance";
import urlHelper from "@/utils/urlHelper";

export interface BookingItem {
  id: number;
  description: string;
  style: string;
  size: string;
  placement: string;
  estimatedPrice: number | null;
  status: string;
  preferredDate: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  artistName: string;
  artistSlug: string;
  artistCity: string;
}

interface BookingState {
  list: BookingItem[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchBookings = createAsyncThunk(
  "bookings/fetchList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(urlHelper.bookings.list);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to fetch bookings");
    }
  }
);

export const fetchArtistBookings = createAsyncThunk(
  "bookings/fetchArtist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(urlHelper.bookings.artistBookings);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to fetch bookings");
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchBookings.fulfilled, (state, action: PayloadAction<BookingItem[]>) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchBookings.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(fetchArtistBookings.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchArtistBookings.fulfilled, (state, action: PayloadAction<BookingItem[]>) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchArtistBookings.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export default bookingSlice.reducer;
