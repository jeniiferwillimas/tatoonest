import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "@/utils/axiosInstance";
import urlHelper from "@/utils/urlHelper";

interface ArtistListImage {
  imageUrl: string;
  price: number | null;
}

interface ArtistItem {
  name: string;
  slug: string;
  location: string;
  rating: number;
  isStudio: boolean;
  followers: string | null;
  priceMin: number | null;
  priceMax: number | null;
  profileImageUrl: string | null;
  styles: string[];
  images: ArtistListImage[];
}

interface PortfolioImage {
  id: number;
  imageUrl: string;
  price: number | null;
  orderNo: number;
}

interface ArtistDetail {
  id: number;
  name: string;
  slug: string;
  city: string;
  country: string;
  location: string;
  rating: number;
  isStudio: boolean;
  bio: string | null;
  instagramHandle: string | null;
  profileImageUrl: string | null;
  followers: string | null;
  priceMin: number | null;
  priceMax: number | null;
  pieceCount: number;
  styles: string[];
  images: PortfolioImage[];
}

interface ArtistState {
  list: ArtistItem[];
  current: ArtistDetail | null;
  loading: boolean;
  detailLoading: boolean;
  error: string | null;
}

const initialState: ArtistState = {
  list: [],
  current: null,
  loading: false,
  detailLoading: false,
  error: null,
};

export const fetchArtists = createAsyncThunk(
  "artists/fetchList",
  async (params: { style?: string; search?: string }, { rejectWithValue }) => {
    try {
      const res = await api.get(urlHelper.artists.list, { params });
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to fetch artists");
    }
  }
);

export const fetchArtistBySlug = createAsyncThunk(
  "artists/fetchBySlug",
  async (slug: string, { rejectWithValue }) => {
    try {
      const res = await api.get(urlHelper.artists.bySlug(slug));
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to fetch artist");
    }
  }
);

const artistSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {
    resetArtists(state) {
      state.list = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtists.fulfilled, (state, action: PayloadAction<ArtistItem[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchArtists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchArtistBySlug.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchArtistBySlug.fulfilled, (state, action: PayloadAction<ArtistDetail>) => {
        state.detailLoading = false;
        state.current = action.payload;
      })
      .addCase(fetchArtistBySlug.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetArtists } = artistSlice.actions;
export default artistSlice.reducer;
