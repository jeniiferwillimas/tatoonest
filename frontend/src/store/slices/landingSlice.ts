import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "@/utils/axiosInstance";
import urlHelper from "@/utils/urlHelper";

interface StyleItem {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  artists: string;
  isFeatured: boolean;
}

interface TestimonialItem {
  quote: string;
  name: string;
  initials: string;
  city: string;
  verified: boolean;
}

interface StatItem {
  value: string;
  label: string;
}

interface LandingState {
  stats: StatItem[];
  testimonials: TestimonialItem[];
  popularCities: string[];
  styles: StyleItem[];
  loading: boolean;
  error: string | null;
}

const initialState: LandingState = {
  stats: [],
  testimonials: [],
  popularCities: [],
  styles: [],
  loading: false,
  error: null,
};

export const fetchLandingData = createAsyncThunk(
  "landing/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(urlHelper.landing.data);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to fetch landing data");
    }
  }
);

interface LandingPayload {
  stats: StatItem[];
  testimonials: TestimonialItem[];
  popularCities: string[];
  styles: StyleItem[];
}

const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLandingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLandingData.fulfilled, (state, action: PayloadAction<LandingPayload>) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.testimonials = action.payload.testimonials;
        state.popularCities = action.payload.popularCities;
        state.styles = action.payload.styles;
      })
      .addCase(fetchLandingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default landingSlice.reducer;
