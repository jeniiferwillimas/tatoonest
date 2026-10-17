"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bookmark, Trash2, ExternalLink } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSavedItems, fetchBoards } from "@/store/slices/savedSlice";
import api from "@/utils/axiosInstance";
import urlHelper, { imgSrc } from "@/utils/urlHelper";

export default function BookmarksPage() {
  const dispatch = useAppDispatch();
  const { items, boards, loading } = useAppSelector((s) => s.saved);

  useEffect(() => {
    dispatch(fetchSavedItems());
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleRemove = async (id: number) => {
    await api.delete(urlHelper.saved.remove(id));
    dispatch(fetchSavedItems());
    dispatch(fetchBoards());
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Saved Items</h1>
        <p className="mt-1 text-sm" style={{ color: "#666" }}>Artists, tattoos and ideas you&apos;ve saved.</p>
      </div>

      {/* Boards */}
      {boards.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {boards.map((board) => (
            <div key={board.name} className="shrink-0 rounded-xl border border-gray-200 bg-white px-5 py-3">
              <p className="text-sm font-semibold">{board.name}</p>
              <p className="text-xs" style={{ color: "#999" }}>{board.count} item{board.count !== 1 ? "s" : ""}</p>
            </div>
          ))}
        </div>
      )}

      {/* Items Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-200 bg-white py-20 text-center">
          <Bookmark size={40} className="mx-auto mb-3" style={{ color: "#ccc" }} />
          <p className="text-lg font-semibold">Nothing saved yet</p>
          <p className="mt-1 text-sm" style={{ color: "#999" }}>
            Save artists and tattoo ideas while browsing.
          </p>
          <Link href="/artists" className="mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:underline">
            Browse artists
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white">
              {item.imageUrl ? (
                <div className="relative aspect-square">
                  <Image src={imgSrc(item.imageUrl)} alt="" fill sizes="25vw" className="object-cover" />
                </div>
              ) : (
                <div className="flex aspect-square items-center justify-center bg-gray-50">
                  <Bookmark size={32} style={{ color: "#ccc" }} />
                </div>
              )}
              <div className="p-3">
                {item.artistName && (
                  <Link href={`/artists/${item.artistSlug}`} className="text-sm font-semibold hover:text-[var(--accent)]">
                    {item.artistName} <ExternalLink size={11} className="mb-0.5 inline" />
                  </Link>
                )}
                {item.note && <p className="mt-1 text-xs" style={{ color: "#666" }}>{item.note}</p>}
                <p className="mt-1 text-[10px]" style={{ color: "#999" }}>
                  {item.boardName} · {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-gray-500 opacity-0 shadow transition-all hover:bg-red-500 hover:text-white group-hover:opacity-100"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
