"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Upload, X, Trash2, Save, MessageSquare, ImageIcon } from "lucide-react";
import { Button, Input, Textarea } from "@/components/ui";
import api from "@/utils/axiosInstance";
import urlHelper, { imgSrc } from "@/utils/urlHelper";

const STYLE_OPTIONS = [
  "Traditional", "Neo-traditional", "Realism", "Black & Gray", "Japanese",
  "Fine Line", "Minimalist", "Geometric", "Dotwork", "Watercolor",
  "Illustrative", "Anime",
];

interface ArtistImage {
  id: number;
  imageUrl: string;
  price: number | null;
  orderNo: number;
}

interface ConversationItem {
  id: number;
  userName: string;
  userEmail: string;
  lastMessage: string | null;
  lastMessageAt: string;
  messageCount: number;
  unreadCount: number;
}

interface MessageItem {
  id: number;
  senderId: string;
  senderName: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

interface Artist {
  id: number;
  name: string;
  slug: string;
  city: string;
  country: string;
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
  images: ArtistImage[];
}

export default function ArtistDetailPageWrapper() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" /></div>}>
      <ArtistDetailPage />
    </Suspense>
  );
}

function ArtistDetailPage() {
  const params = useParams();
  const router = useRouter();
  const artistId = Number(params.id);

  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tab, setTab] = useState<"details" | "images" | "messages">("details");

  // Form state
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [followers, setFollowers] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [pieceCount, setPieceCount] = useState("");
  const [rating, setRating] = useState("");
  const [isStudio, setIsStudio] = useState(false);
  const [styles, setStyles] = useState<string[]>([]);

  // Messages
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [selectedConvo, setSelectedConvo] = useState<number | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [convoLoading, setConvoLoading] = useState(false);

  const fetchArtist = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(urlHelper.adminArtists.get(artistId));
      const a = res.data;
      setArtist(a);
      setName(a.name);
      setCity(a.city);
      setCountry(a.country);
      setBio(a.bio || "");
      setInstagramHandle(a.instagramHandle || "");
      setFollowers(a.followers || "");
      setPriceMin(a.priceMin?.toString() || "");
      setPriceMax(a.priceMax?.toString() || "");
      setPieceCount(a.pieceCount.toString());
      setRating(a.rating.toString());
      setIsStudio(a.isStudio);
      setStyles(a.styles);
    } catch { /* empty */ } finally {
      setLoading(false);
    }
  }, [artistId]);

  const fetchConversations = useCallback(async () => {
    try {
      const res = await api.get(urlHelper.adminMessages.conversations, { params: { artistId } });
      setConversations(res.data);
    } catch { /* empty */ }
  }, [artistId]);

  useEffect(() => { fetchArtist(); }, [fetchArtist]);
  useEffect(() => { if (tab === "messages") fetchConversations(); }, [tab, fetchConversations]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(urlHelper.adminArtists.update(artistId), {
        name, city: city || null, country: country || null, bio: bio || null,
        instagramHandle: instagramHandle || null, followers: followers || null,
        priceMin: priceMin ? parseInt(priceMin) : null,
        priceMax: priceMax ? parseInt(priceMax) : null,
        pieceCount: pieceCount ? parseInt(pieceCount) : null,
        rating: rating ? parseFloat(rating) : null,
        isStudio, styles,
      });
      fetchArtist();
    } catch { /* empty */ } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (files: FileList) => {
    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const fd = new FormData();
        fd.append("file", files[i]);
        await api.post(urlHelper.adminArtists.uploadImage(artistId), fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchArtist();
    } catch { /* empty */ } finally {
      setUploading(false);
    }
  };

  const handleProfileUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      await api.post(urlHelper.adminArtists.uploadProfileImage(artistId), fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchArtist();
    } catch { /* empty */ } finally {
      setUploading(false);
    }
  };

  const handleImageDelete = async (imageId: number) => {
    try {
      await api.delete(urlHelper.adminArtists.deleteImage(artistId, imageId));
      fetchArtist();
    } catch { /* empty */ }
  };

  const openConversation = async (convoId: number) => {
    setSelectedConvo(convoId);
    setConvoLoading(true);
    try {
      const res = await api.get(urlHelper.adminMessages.conversation(convoId));
      setMessages(res.data.messages || res.data.Messages || []);
    } catch { /* empty */ } finally {
      setConvoLoading(false);
    }
  };

  const deleteConversation = async (convoId: number) => {
    try {
      await api.delete(urlHelper.adminMessages.deleteConversation(convoId));
      setSelectedConvo(null);
      fetchConversations();
    } catch { /* empty */ }
  };

  const toggleStyle = (style: string) => {
    setStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm" style={{ color: "#999" }}>Artist not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/dashboard/admin/artists")}>Back to Artists</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => router.push("/dashboard/admin/artists")} className="rounded-lg p-2 transition-colors hover:bg-gray-100">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-3 flex-1">
          {artist.profileImageUrl ? (
            <img src={imgSrc(artist.profileImageUrl)} alt="" className="h-12 w-12 rounded-full object-cover" />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-white">
              {artist.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold">{artist.name}</h1>
            <p className="text-sm" style={{ color: "#999" }}>{artist.city}{artist.country ? `, ${artist.country}` : ""} — {artist.images.length} images</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b">
        {(["details", "images", "messages"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
              tab === t ? "border-b-2 border-[var(--accent)] text-[var(--accent)]" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ─── Details Tab ─── */}
      {tab === "details" && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
          <div className="flex items-center gap-4 mb-2">
            <div className="relative">
              {artist.profileImageUrl ? (
                <img src={imgSrc(artist.profileImageUrl)} alt="" className="h-20 w-20 rounded-full object-cover border-2 border-gray-200" />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <ImageIcon size={28} />
                </div>
              )}
            </div>
            <label className="cursor-pointer">
              <span className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium hover:border-[var(--accent)] hover:text-[var(--accent)]">
                <Upload size={14} /> Change Avatar
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleProfileUpload(e.target.files[0]); }} />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Instagram" value={instagramHandle} onChange={(e) => setInstagramHandle(e.target.value)} placeholder="without @" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="City" value={city} onChange={(e) => setCity(e.target.value)} />
            <Input label="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>
          <Textarea label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
          <div className="grid gap-4 sm:grid-cols-4">
            <Input label="Price Min ($)" type="number" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
            <Input label="Price Max ($)" type="number" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
            <Input label="Rating" type="number" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="0-5" />
            <Input label="Followers" value={followers} onChange={(e) => setFollowers(e.target.value)} placeholder="e.g. 12.5k" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Piece Count" type="number" value={pieceCount} onChange={(e) => setPieceCount(e.target.value)} />
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 text-sm font-medium">
                <input type="checkbox" checked={isStudio} onChange={(e) => setIsStudio(e.target.checked)} className="h-4 w-4 rounded border-gray-300 accent-[var(--accent)]" />
                This is a studio
              </label>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Styles</p>
            <div className="flex flex-wrap gap-2">
              {STYLE_OPTIONS.map((s) => (
                <button key={s} onClick={() => toggleStyle(s)} className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${styles.includes(s) ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-gray-200 hover:border-[var(--accent)]"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button onClick={handleSave} disabled={saving || !name.trim()}>
              <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      )}

      {/* ─── Images Tab ─── */}
      {tab === "images" && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{artist.images.length} Portfolio Images</p>
            <label className="cursor-pointer">
              <span className="inline-flex items-center gap-1 rounded-lg bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)]">
                <Upload size={14} /> {uploading ? "Uploading..." : "Upload Images"}
              </span>
              <input type="file" accept="image/*" multiple className="hidden" disabled={uploading} onChange={(e) => { if (e.target.files?.length) handleImageUpload(e.target.files); }} />
            </label>
          </div>
          {artist.images.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-gray-200 py-16 text-center">
              <ImageIcon size={40} className="mx-auto mb-3 text-gray-300" />
              <p className="text-sm" style={{ color: "#999" }}>No portfolio images. Upload some above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {artist.images.map((img) => (
                <div key={img.id} className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200">
                  <img src={imgSrc(img.imageUrl)} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/30" />
                  <button
                    onClick={() => handleImageDelete(img.id)}
                    className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X size={14} />
                  </button>
                  {img.price && (
                    <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">${img.price}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── Messages Tab ─── */}
      {tab === "messages" && (
        <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
          {/* Conversations list */}
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="border-b px-4 py-3">
              <p className="text-sm font-semibold">Conversations ({conversations.length})</p>
            </div>
            {conversations.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm" style={{ color: "#999" }}>No messages for this artist.</div>
            ) : (
              <div className="max-h-[500px] overflow-y-auto">
                {conversations.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => openConversation(c.id)}
                    className={`w-full border-b border-gray-100 px-4 py-3 text-left transition-colors hover:bg-gray-50 ${selectedConvo === c.id ? "bg-gray-50" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{c.userName}</p>
                      {c.unreadCount > 0 && (
                        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[var(--accent)] px-1.5 text-[10px] font-bold text-white">{c.unreadCount}</span>
                      )}
                    </div>
                    <p className="text-xs" style={{ color: "#999" }}>{c.userEmail}</p>
                    <p className="mt-1 truncate text-xs" style={{ color: "#666" }}>{c.lastMessage || "No messages"}</p>
                    <p className="mt-0.5 text-[10px]" style={{ color: "#bbb" }}>{new Date(c.lastMessageAt).toLocaleString()}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Message thread */}
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            {!selectedConvo ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <MessageSquare size={32} className="mb-2 text-gray-300" />
                <p className="text-sm" style={{ color: "#999" }}>Select a conversation to view messages.</p>
              </div>
            ) : convoLoading ? (
              <div className="flex justify-center py-20">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between border-b px-4 py-3">
                  <p className="text-sm font-semibold">{messages.length} messages</p>
                  <button onClick={() => deleteConversation(selectedConvo)} className="rounded-lg p-1.5 text-red-500 transition-colors hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="max-h-[450px] overflow-y-auto p-4 space-y-3">
                  {messages.map((m) => (
                    <div key={m.id} className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold">{m.senderName}</span>
                        <span className="text-[10px]" style={{ color: "#bbb" }}>{new Date(m.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="mt-1 rounded-lg bg-gray-50 px-3 py-2 text-sm">{m.content}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
