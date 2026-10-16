import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "@/utils/axiosInstance";
import urlHelper from "@/utils/urlHelper";

export interface Plan {
  name: string;
  price: number;
  features: string[];
}

export interface SubscriptionStatus {
  plan: string | null;
  status: string;
  amount?: number;
  currency?: string;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
}

interface PaymentState {
  plans: Plan[];
  subscription: SubscriptionStatus | null;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  plans: [],
  subscription: null,
  loading: false,
  error: null,
};

export const fetchPlans = createAsyncThunk(
  "payments/fetchPlans",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(urlHelper.payments.plans);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to fetch plans");
    }
  }
);

export const fetchSubscriptionStatus = createAsyncThunk(
  "payments/fetchSubscriptionStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(urlHelper.payments.subscriptionStatus);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to fetch subscription");
    }
  }
);

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    clearPaymentError(state) { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchPlans.fulfilled, (state, action: PayloadAction<Plan[]>) => { state.loading = false; state.plans = action.payload; })
      .addCase(fetchPlans.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(fetchSubscriptionStatus.fulfilled, (state, action: PayloadAction<SubscriptionStatus>) => { state.subscription = action.payload; });
  },
});

export const { clearPaymentError } = paymentSlice.actions;
export default paymentSlice.reducer;
