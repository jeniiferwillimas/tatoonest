import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "@/utils/axiosInstance";
import urlHelper from "@/utils/urlHelper";

export interface SavedItemData {
  id: number;
  boardName: string | null;
  note: string | null;
  createdAt: string;
  artistId: number | null;
  artistName: string | null;
  artistSlug: string | null;
  imageUrl: string | null;
}

export interface BoardData {
  name: string;
  count: number;
  lastAdded: string;
}

interface SavedState {
  items: SavedItemData[];
  boards: BoardData[];
  loading: boolean;
  error: string | null;
}

const initialState: SavedState = {
  items: [],
  boards: [],
  loading: false,
  error: null,
};

export const fetchSavedItems = createAsyncThunk(
  "saved/fetchItems",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(urlHelper.saved.list);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to fetch saved items");
    }
  }
);

export const fetchBoards = createAsyncThunk(
  "saved/fetchBoards",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(urlHelper.saved.boards);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to fetch boards");
    }
  }
);

const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedItems.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchSavedItems.fulfilled, (state, action: PayloadAction<SavedItemData[]>) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchSavedItems.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(fetchBoards.fulfilled, (state, action: PayloadAction<BoardData[]>) => { state.boards = action.payload; });
  },
});

export default savedSlice.reducer;
