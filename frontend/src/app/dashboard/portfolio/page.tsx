"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Image as ImageIcon, DollarSign } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchArtistProfile } from "@/store/slices/artistProfileSlice";
import api from "@/utils/axiosInstance";
import urlHelper, { imgSrc } from "@/utils/urlHelper";
import { Button } from "@/components/ui";

export default function PortfolioPage() {
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector((s) => s.artistProfile);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(fetchArtistProfile());
  }, [dispatch]);

  const images = profile?.images || [];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      await api.post(urlHelper.artistProfile.uploadImage, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(fetchArtistProfile());
    } catch {
      // handle error silently
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageId: number) => {
    try {
      await api.delete(urlHelper.artistProfile.deleteImage(imageId));
      dispatch(fetchArtistProfile());
    } catch {
      // handle error silently
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Portfolio</h1>
          <p className="mt-1 text-sm" style={{ color: "#666" }}>
            Showcase your best work. Upload high-quality images of your tattoos.
          </p>
        </div>
        <label className="cursor-pointer">
          <Button variant="primary" size="sm" disabled={uploading}>
            <Plus size={16} className="mr-1" />
            {uploading ? "Uploading..." : "Add Image"}
          </Button>
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {images.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-200 bg-white py-20 text-center">
          <ImageIcon size={48} className="mx-auto mb-3" style={{ color: "#ccc" }} />
          <p className="text-lg font-semibold">No images yet</p>
          <p className="mt-1 text-sm" style={{ color: "#999" }}>
            Upload your first portfolio image to get started.
          </p>
          <label className="mt-4 inline-block cursor-pointer">
            <Button variant="primary" size="sm">
              <Plus size={16} className="mr-1" /> Upload Image
            </Button>
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((img: { id: number; imageUrl: string; price: number | null }) => (
            <div key={img.id} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="relative aspect-square">
                <Image
                  src={imgSrc(img.imageUrl)}
                  alt="Portfolio"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/50 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  {img.price && (
                    <span className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold">
                      <DollarSign size={12} />{img.price}
                    </span>
                  )}
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
