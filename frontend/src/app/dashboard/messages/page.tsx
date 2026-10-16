"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Send, Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchConversations, fetchMessages, setActiveConversation } from "@/store/slices/messageSlice";
import api from "@/utils/axiosInstance";
import urlHelper from "@/utils/urlHelper";

export default function MessagesPage() {
  const dispatch = useAppDispatch();
  const { conversations, activeMessages, activeConversationId, loading } = useAppSelector((s) => s.messages);
  const [newMessage, setNewMessage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  const handleSelectConversation = (id: number) => {
    dispatch(setActiveConversation(id));
    dispatch(fetchMessages(id));
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !activeConversationId) return;
    await api.post(urlHelper.messages.send(activeConversationId), { content: newMessage });
    setNewMessage("");
    dispatch(fetchMessages(activeConversationId));
  };

  const filteredConversations = conversations.filter((c) =>
    !search || c.artistName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Conversations List */}
      <div className="flex w-80 shrink-0 flex-col border-r border-gray-200">
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-lg font-bold">Messages</h2>
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
            <Search size={16} style={{ color: "#999" }} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading && conversations.length === 0 ? (
            <div className="flex justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <MessageSquare size={28} className="mx-auto mb-2" style={{ color: "#ccc" }} />
              <p className="text-sm font-medium">No conversations</p>
              <p className="mt-1 text-xs" style={{ color: "#999" }}>
                Start a conversation from an artist&apos;s profile.
              </p>
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleSelectConversation(conv.id)}
                className={`flex w-full items-start gap-3 border-b border-gray-100 p-4 text-left transition-colors hover:bg-gray-50 ${
                  activeConversationId === conv.id ? "bg-[var(--accent)]/5" : ""
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
                  {conv.artistName.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-semibold">{conv.artistName}</p>
                    {conv.unreadCount > 0 && (
                      <span className="ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-white">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-xs" style={{ color: "#999" }}>{conv.lastMessage || "No messages yet"}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col">
        {activeConversationId ? (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {activeMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.isOwn
                        ? "bg-[var(--accent)] text-white"
                        : "border border-gray-200 bg-gray-50"
                    }`}>
                      {msg.content}
                      <p className={`mt-1 text-[10px] ${msg.isOwn ? "text-white/60" : ""}`} style={msg.isOwn ? {} : { color: "#999" }}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 rounded-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[var(--accent)]"
                />
                <button
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-white transition-colors hover:bg-[var(--accent-hover)] disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <MessageSquare size={48} className="mx-auto mb-3" style={{ color: "#ddd" }} />
              <p className="text-base font-semibold">Select a conversation</p>
              <p className="mt-1 text-sm" style={{ color: "#999" }}>
                Choose a conversation to start messaging.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
