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

interface PaginatedResponse {
  artists: ArtistItem[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface ArtistState {
  list: ArtistItem[];
  current: ArtistDetail | null;
  loading: boolean;
  loadingMore: boolean;
  detailLoading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  totalCount: number;
  hasMore: boolean;
}

const initialState: ArtistState = {
  list: [],
  current: null,
  loading: false,
  loadingMore: false,
  detailLoading: false,
  error: null,
  page: 0,
  totalPages: 0,
  totalCount: 0,
  hasMore: true,
};

export const fetchArtists = createAsyncThunk(
  "artists/fetchList",
  async (params: { style?: string; search?: string; page?: number; pageSize?: number }, { rejectWithValue }) => {
    try {
      const res = await api.get(urlHelper.artists.list, {
        params: { ...params, page: params.page || 1, pageSize: params.pageSize || 24 },
      });
      return res.data as PaginatedResponse;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to fetch artists");
    }
  }
);

export const fetchMoreArtists = createAsyncThunk(
  "artists/fetchMore",
  async (params: { style?: string; search?: string; page: number; pageSize?: number }, { rejectWithValue }) => {
    try {
      const res = await api.get(urlHelper.artists.list, {
        params: { ...params, pageSize: params.pageSize || 24 },
      });
      return res.data as PaginatedResponse;
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
      state.page = 0;
      state.totalPages = 0;
      state.totalCount = 0;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtists.fulfilled, (state, action: PayloadAction<PaginatedResponse>) => {
        state.loading = false;
        const data = action.payload;
        state.list = data.artists;
        state.page = data.page;
        state.totalPages = data.totalPages;
        state.totalCount = data.totalCount;
        state.hasMore = data.page < data.totalPages;
      })
      .addCase(fetchArtists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMoreArtists.pending, (state) => {
        state.loadingMore = true;
      })
      .addCase(fetchMoreArtists.fulfilled, (state, action: PayloadAction<PaginatedResponse>) => {
        state.loadingMore = false;
        const data = action.payload;
        state.list = [...state.list, ...data.artists];
        state.page = data.page;
        state.totalPages = data.totalPages;
        state.totalCount = data.totalCount;
        state.hasMore = data.page < data.totalPages;
      })
      .addCase(fetchMoreArtists.rejected, (state, action) => {
        state.loadingMore = false;
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
