import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "@/utils/axiosInstance";
import urlHelper from "@/utils/urlHelper";

export interface ConversationItem {
  id: number;
  artistName: string;
  artistSlug: string;
  lastMessageAt: string;
  lastMessage: string | null;
  unreadCount: number;
}

export interface MessageItem {
  id: number;
  senderId: string;
  content: string;
  attachmentUrl: string | null;
  isRead: boolean;
  createdAt: string;
  isOwn: boolean;
}

interface MessageState {
  conversations: ConversationItem[];
  activeMessages: MessageItem[];
  activeConversationId: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  conversations: [],
  activeMessages: [],
  activeConversationId: null,
  loading: false,
  error: null,
};

export const fetchConversations = createAsyncThunk(
  "messages/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(urlHelper.messages.conversations);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to fetch conversations");
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (conversationId: number, { rejectWithValue }) => {
    try {
      const res = await api.get(urlHelper.messages.conversation(conversationId));
      return { conversationId, messages: res.data };
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || "Failed to fetch messages");
    }
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setActiveConversation(state, action: PayloadAction<number | null>) {
      state.activeConversationId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchConversations.fulfilled, (state, action: PayloadAction<ConversationItem[]>) => { state.loading = false; state.conversations = action.payload; })
      .addCase(fetchConversations.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(fetchMessages.fulfilled, (state, action) => { state.activeMessages = action.payload.messages; state.activeConversationId = action.payload.conversationId; });
  },
});

export const { setActiveConversation } = messageSlice.actions;
export default messageSlice.reducer;
