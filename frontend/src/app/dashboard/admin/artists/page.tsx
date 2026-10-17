"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, Pencil, Trash2, Upload, X, Image as ImageIcon } from "lucide-react";
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

interface FormData {
  name: string;
  city: string;
  country: string;
  bio: string;
  instagramHandle: string;
  followers: string;
  priceMin: string;
  priceMax: string;
  pieceCount: string;
  rating: string;
  isStudio: boolean;
  styles: string[];
}

const emptyForm: FormData = {
  name: "", city: "", country: "", bio: "", instagramHandle: "",
  followers: "", priceMin: "", priceMax: "", pieceCount: "", rating: "",
  isStudio: false, styles: [],
};

export default function ArtistsManagementPage() {
  const router = useRouter();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [imageModal, setImageModal] = useState<Artist | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const fetchArtists = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(urlHelper.adminArtists.list);
      setArtists(res.data);
    } catch { /* empty */ } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchArtists(); }, [fetchArtists]);

  const filtered = artists.filter((a) =>
    !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.city.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (artist: Artist) => {
    setEditingId(artist.id);
    setForm({
      name: artist.name,
      city: artist.city,
      country: artist.country,
      bio: artist.bio || "",
      instagramHandle: artist.instagramHandle || "",
      followers: artist.followers || "",
      priceMin: artist.priceMin?.toString() || "",
      priceMax: artist.priceMax?.toString() || "",
      pieceCount: artist.pieceCount.toString(),
      rating: artist.rating.toString(),
      isStudio: artist.isStudio,
      styles: artist.styles,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        city: form.city || null,
        country: form.country || null,
        bio: form.bio || null,
        instagramHandle: form.instagramHandle || null,
        followers: form.followers || null,
        priceMin: form.priceMin ? parseInt(form.priceMin) : null,
        priceMax: form.priceMax ? parseInt(form.priceMax) : null,
        pieceCount: form.pieceCount ? parseInt(form.pieceCount) : null,
        rating: form.rating ? parseFloat(form.rating) : null,
        isStudio: form.isStudio,
        styles: form.styles,
      };
      if (editingId) {
        await api.put(urlHelper.adminArtists.update(editingId), payload);
      } else {
        await api.post(urlHelper.adminArtists.create, payload);
      }
      setModalOpen(false);
      fetchArtists();
    } catch { /* empty */ } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(urlHelper.adminArtists.delete(id));
      setDeleteConfirm(null);
      fetchArtists();
    } catch { /* empty */ }
  };

  const handleImageUpload = async (artistId: number, files: FileList) => {
    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const fd = new window.FormData();
        fd.append("file", files[i]);
        await api.post(urlHelper.adminArtists.uploadImage(artistId), fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      const res = await api.get(urlHelper.adminArtists.get(artistId));
      setImageModal(res.data);
      fetchArtists();
    } catch { /* empty */ } finally {
      setUploading(false);
    }
  };

  const handleProfileImageUpload = async (artistId: number, file: File) => {
    setUploading(true);
    try {
      const fd = new window.FormData();
      fd.append("file", file);
      await api.post(urlHelper.adminArtists.uploadProfileImage(artistId), fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const res = await api.get(urlHelper.adminArtists.get(artistId));
      setImageModal(res.data);
      fetchArtists();
    } catch { /* empty */ } finally {
      setUploading(false);
    }
  };

  const handleImageDelete = async (artistId: number, imageId: number) => {
    try {
      await api.delete(urlHelper.adminArtists.deleteImage(artistId, imageId));
      const res = await api.get(urlHelper.adminArtists.get(artistId));
      setImageModal(res.data);
      fetchArtists();
    } catch { /* empty */ }
  };

  const toggleStyle = (style: string) => {
    setForm((prev) => ({
      ...prev,
      styles: prev.styles.includes(style)
        ? prev.styles.filter((s) => s !== style)
        : [...prev.styles, style],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Artists Management</h1>
          <p className="mt-1 text-sm" style={{ color: "#666" }}>Create, edit and manage artist profiles and portfolios.</p>
        </div>
        <Button onClick={openCreate} size="md">
          <Plus size={18} /> Add New Artist
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 max-w-sm">
        <Search size={16} style={{ color: "#999" }} />
        <input
          type="text"
          placeholder="Search artists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-sm outline-none flex-1"
        />
      </div>

      {/* Artists Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-sm" style={{ color: "#999" }}>No artists found.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((artist) => (
            <div key={artist.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md">
              {/* Portfolio preview strip */}
              <div className="flex h-28 gap-0.5 overflow-hidden bg-gray-100">
                {artist.images.length > 0 ? (
                  artist.images.slice(0, 4).map((img, i) => (
                    <div key={img.id} className="relative flex-1 overflow-hidden" style={{ minWidth: 0 }}>
                      <img src={imgSrc(img.imageUrl)} alt="" className="h-full w-full object-cover" />
                      {i === 3 && artist.images.length > 4 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-bold text-white">+{artist.images.length - 4}</div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-1 items-center justify-center">
                    <div className="text-center">
                      <ImageIcon size={24} className="mx-auto text-gray-300" />
                      <p className="mt-1 text-[10px]" style={{ color: "#bbb" }}>No images</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Artist info */}
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <button onClick={() => router.push(`/dashboard/admin/artists/${artist.id}`)}>
                    {artist.profileImageUrl ? (
                      <img src={imgSrc(artist.profileImageUrl)} alt="" className="h-11 w-11 rounded-full object-cover border-2 border-white shadow-sm" />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white shadow-sm">
                        {artist.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </div>
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <button onClick={() => router.push(`/dashboard/admin/artists/${artist.id}`)} className="text-left">
                      <p className="text-sm font-semibold hover:text-[var(--accent)] truncate">{artist.name}</p>
                    </button>
                    <p className="text-xs truncate" style={{ color: "#999" }}>{artist.city}{artist.country ? `, ${artist.country}` : ""}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-yellow-600">
                    ★ {artist.rating.toFixed(1)}
                  </div>
                </div>

                {/* Styles */}
                <div className="mt-2.5 flex flex-wrap gap-1">
                  {artist.styles.slice(0, 3).map((s) => (
                    <span key={s} className="rounded-full border border-gray-200 px-2 py-0.5 text-[10px]">{s}</span>
                  ))}
                  {artist.styles.length > 3 && (
                    <span className="text-[10px]" style={{ color: "#999" }}>+{artist.styles.length - 3}</span>
                  )}
                </div>

                {/* Stats row */}
                <div className="mt-3 flex items-center gap-4 text-[11px]" style={{ color: "#999" }}>
                  <span>{artist.images.length} images</span>
                  {artist.followers && <span>{artist.followers} followers</span>}
                  {artist.priceMin && <span>${artist.priceMin}{artist.priceMax ? `–$${artist.priceMax}` : "+"}</span>}
                </div>

                {/* Actions */}
                <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
                  <button onClick={() => openEdit(artist)} className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-[var(--accent)]">
                    <Pencil size={13} /> Edit
                  </button>
                  <button onClick={() => setImageModal(artist)} className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600">
                    <ImageIcon size={13} /> Images
                  </button>
                  <div className="flex-1" />
                  <button onClick={() => setDeleteConfirm(artist.id)} className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Create / Edit Modal ─── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-16">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-bold">{editingId ? "Edit Artist" : "Add New Artist"}</h2>
              <button onClick={() => setModalOpen(false)} className="rounded-lg p-1 hover:bg-gray-100"><X size={20} /></button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <Input label="Instagram Handle" value={form.instagramHandle} onChange={(e) => setForm({ ...form, instagramHandle: e.target.value })} placeholder="without @" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                <Input label="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
              </div>
              <Textarea label="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} />
              <div className="grid gap-4 sm:grid-cols-3">
                <Input label="Price Min ($)" type="number" value={form.priceMin} onChange={(e) => setForm({ ...form, priceMin: e.target.value })} />
                <Input label="Price Max ($)" type="number" value={form.priceMax} onChange={(e) => setForm({ ...form, priceMax: e.target.value })} />
                <Input label="Rating" type="number" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} placeholder="0-5" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Followers" value={form.followers} onChange={(e) => setForm({ ...form, followers: e.target.value })} placeholder="e.g. 12.5k" />
                <Input label="Piece Count" type="number" value={form.pieceCount} onChange={(e) => setForm({ ...form, pieceCount: e.target.value })} />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isStudio" checked={form.isStudio} onChange={(e) => setForm({ ...form, isStudio: e.target.checked })} className="h-4 w-4 rounded border-gray-300 accent-[var(--accent)]" />
                <label htmlFor="isStudio" className="text-sm font-medium">This is a studio</label>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Styles</p>
                <div className="flex flex-wrap gap-2">
                  {STYLE_OPTIONS.map((style) => (
                    <button
                      key={style}
                      onClick={() => toggleStyle(style)}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                        form.styles.includes(style)
                          ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                          : "border-gray-200 hover:border-[var(--accent)]"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
              <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving || !form.name.trim()}>
                {saving ? "Saving..." : editingId ? "Save Changes" : "Create Artist"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Image Management Modal ─── */}
      {imageModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-16">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-bold">{imageModal.name} — Images</h2>
              <button onClick={() => setImageModal(null)} className="rounded-lg p-1 hover:bg-gray-100"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-6">
              {/* Profile Image */}
              <div>
                <p className="mb-2 text-sm font-medium">Profile Image</p>
                <div className="flex items-center gap-4">
                  {imageModal.profileImageUrl ? (
                    <img src={imgSrc(imageModal.profileImageUrl)} alt="" className="h-20 w-20 rounded-full object-cover border-2 border-gray-200" />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                      <ImageIcon size={28} />
                    </div>
                  )}
                  <label className="cursor-pointer">
                    <span className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">
                      <Upload size={14} /> Upload Profile Image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) handleProfileImageUpload(imageModal.id, e.target.files[0]);
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Portfolio Images */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-medium">Portfolio Images ({imageModal.images.length})</p>
                  <label className="cursor-pointer">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]">
                      <Upload size={14} /> {uploading ? "Uploading..." : "Upload Images"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => {
                        if (e.target.files?.length) handleImageUpload(imageModal.id, e.target.files);
                      }}
                    />
                  </label>
                </div>
                {imageModal.images.length === 0 ? (
                  <div className="rounded-lg border-2 border-dashed border-gray-200 py-12 text-center">
                    <ImageIcon size={32} className="mx-auto mb-2 text-gray-300" />
                    <p className="text-sm" style={{ color: "#999" }}>No images yet. Upload portfolio images above.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {imageModal.images.map((img) => (
                      <div key={img.id} className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200">
                        <img src={imgSrc(img.imageUrl)} alt="" className="h-full w-full object-cover" />
                        <button
                          onClick={() => handleImageDelete(imageModal.id, img.id)}
                          className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X size={14} />
                        </button>
                        {img.price && (
                          <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">${img.price}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end border-t px-6 py-4">
              <Button variant="outline" onClick={() => setImageModal(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Delete Confirmation ─── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold">Delete Artist</h3>
            <p className="mt-2 text-sm" style={{ color: "#666" }}>
              Are you sure? This will permanently delete this artist and all their images.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
