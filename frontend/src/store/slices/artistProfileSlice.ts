import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "@/utils/axiosInstance";
import urlHelper from "@/utils/urlHelper";

interface ArtistImageItem {
  id: number;
  imageUrl: string;
  fileName: string;
  orderNo: number;
  price: number | null;
}

interface ArtistProfileData {
  id: number;
  instagramHandle: string | null;
  bio: string | null;
  city: string | null;
  country: string | null;
  profileImageUrl: string | null;
  isStudio: boolean;
  currentStep: number;
  status: string;
  images: ArtistImageItem[];
  styles: string[];
}

interface ArtistProfileState {
  exists: boolean;
  profile: ArtistProfileData | null;
  loading: boolean;
  uploading: boolean;
  error: string | null;
}

const initialState: ArtistProfileState = {
  exists: false,
  profile: null,
  loading: false,
  uploading: false,
  error: null,
};

export const fetchArtistProfile = createAsyncThunk(
  "artistProfile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(urlHelper.artistProfile.get);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to fetch profile");
    }
  }
);

export const createArtistProfile = createAsyncThunk(
  "artistProfile/create",
  async (data: { instagramHandle?: string; isStudio: boolean }, { rejectWithValue }) => {
    try {
      const res = await api.post(urlHelper.artistProfile.create, data);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to create profile");
    }
  }
);

export const updateArtistDetails = createAsyncThunk(
  "artistProfile/updateDetails",
  async (data: { bio?: string; city?: string; country?: string; isStudio: boolean; styles?: string[] }, { rejectWithValue }) => {
    try {
      const res = await api.put(urlHelper.artistProfile.updateDetails, data);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to update details");
    }
  }
);

export const uploadArtistImage = createAsyncThunk(
  "artistProfile/uploadImage",
  async ({ file, price }: { file: File; price?: number }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (price !== undefined) formData.append("price", price.toString());
      const res = await api.post(urlHelper.artistProfile.uploadImage, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to upload image");
    }
  }
);

export const updateImagePrice = createAsyncThunk(
  "artistProfile/updateImagePrice",
  async ({ imageId, price }: { imageId: number; price: number | null }, { rejectWithValue }) => {
    try {
      const res = await api.put(`${urlHelper.artistProfile.uploadImage}/${imageId}/price`, { price });
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to update price");
    }
  }
);

export const deleteArtistImage = createAsyncThunk(
  "artistProfile/deleteImage",
  async (imageId: number, { rejectWithValue }) => {
    try {
      await api.delete(urlHelper.artistProfile.deleteImage(imageId));
      return imageId;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to delete image");
    }
  }
);

export const submitArtistProfile = createAsyncThunk(
  "artistProfile/submit",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post(urlHelper.artistProfile.submit);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to submit profile");
    }
  }
);

const artistProfileSlice = createSlice({
  name: "artistProfile",
  initialState,
  reducers: {
    clearProfileError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtistProfile.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchArtistProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.exists = action.payload.exists;
        state.profile = action.payload.profile ?? null;
      })
      .addCase(fetchArtistProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createArtistProfile.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createArtistProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.exists = true;
        state.profile = { ...state.profile!, ...action.payload, images: [], styles: [] };
      })
      .addCase(createArtistProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateArtistDetails.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateArtistDetails.fulfilled, (state) => { state.loading = false; })
      .addCase(updateArtistDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(uploadArtistImage.pending, (state) => { state.uploading = true; state.error = null; })
      .addCase(uploadArtistImage.fulfilled, (state, action: PayloadAction<ArtistImageItem>) => {
        state.uploading = false;
        if (state.profile) state.profile.images.push(action.payload);
      })
      .addCase(uploadArtistImage.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteArtistImage.fulfilled, (state, action: PayloadAction<number>) => {
        if (state.profile) {
          state.profile.images = state.profile.images.filter((i) => i.id !== action.payload);
        }
      })

      .addCase(updateImagePrice.fulfilled, (state, action) => {
        if (state.profile) {
          const img = state.profile.images.find((i) => i.id === action.payload.id);
          if (img) img.price = action.payload.price;
        }
      })

      .addCase(submitArtistProfile.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(submitArtistProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.status = action.payload.status;
          state.profile.currentStep = action.payload.currentStep;
        }
      })
      .addCase(submitArtistProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfileError } = artistProfileSlice.actions;
export default artistProfileSlice.reducer;
