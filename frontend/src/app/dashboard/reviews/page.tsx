"use client";

import { useEffect } from "react";
import { Star, MessageSquare } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchReceivedReviews } from "@/store/slices/reviewSlice";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const dispatch = useAppDispatch();
  const { list: reviews, averageRating, totalReviews, loading } = useAppSelector((s) => s.reviews);

  useEffect(() => {
    dispatch(fetchReceivedReviews());
  }, [dispatch]);

  const ratingBreakdown = [5, 4, 3, 2, 1].map((r) => ({
    stars: r,
    count: reviews.filter((rev) => rev.rating === r).length,
    pct: totalReviews > 0 ? Math.round((reviews.filter((rev) => rev.rating === r).length / totalReviews) * 100) : 0,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reviews</h1>
        <p className="mt-1 text-sm" style={{ color: "#666" }}>See what clients are saying about your work.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
          <p className="text-5xl font-bold">{averageRating || "—"}</p>
          <div className="mt-2 flex justify-center">
            <StarRating rating={Math.round(averageRating)} />
          </div>
          <p className="mt-2 text-sm" style={{ color: "#999" }}>{totalReviews} review{totalReviews !== 1 ? "s" : ""}</p>

          <div className="mt-6 space-y-2">
            {ratingBreakdown.map((r) => (
              <div key={r.stars} className="flex items-center gap-2">
                <span className="w-4 text-xs font-medium">{r.stars}</span>
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <div className="h-2 flex-1 rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-yellow-400" style={{ width: `${r.pct}%` }} />
                </div>
                <span className="w-8 text-right text-xs" style={{ color: "#999" }}>{r.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
              <MessageSquare size={40} className="mx-auto mb-3" style={{ color: "#ccc" }} />
              <p className="text-lg font-semibold">No reviews yet</p>
              <p className="mt-1 text-sm" style={{ color: "#999" }}>Reviews from your clients will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-xl border border-gray-200 bg-white p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold">{review.userName || "Anonymous"}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <StarRating rating={review.rating} />
                        <span className="text-xs" style={{ color: "#999" }}>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "#444" }}>{review.content}</p>
                  {review.reply && (
                    <div className="mt-3 rounded-lg bg-gray-50 p-3">
                      <p className="text-xs font-semibold" style={{ color: "#666" }}>Your reply:</p>
                      <p className="mt-1 text-sm" style={{ color: "#444" }}>{review.reply}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
