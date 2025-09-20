"use client";

import { useUserStore } from "@/store/userStore";
import { useState, useEffect } from "react";

interface Review {
  _id: string;
  user_id: string;
  reviewText: string;
  rating: number;
  images: string[];
  created_at: string;
}

export default function ReviewPage() {
  const { user } = useUserStore();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?._id) fetchReviews();
  }, [user]);

  // Fetch reviews for current user
  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/reviews?user_id=${user?._id}`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data.reviews || []);
      setLoading(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Delete a review
  const handleDeleteReview = async (id: string) => {
    try {
      const res = await fetch(`/api/reviews?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete review");
      setReviews(reviews.filter((r) => r._id !== id));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading reviews...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className=" mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6 ">My Reviews</h1>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        {reviews.length === 0 ? (
          <div className="text-gray-500 text-center">No reviews found.</div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden divide-y divide-gray-200">
            {reviews.map((review) => (
              <div key={review._id} className="p-4 md:p-6 flex justify-between items-start">
                <div>
                  <div className="text-gray-900 font-medium">Rating: {review.rating} ⭐</div>
                  <div className="text-gray-700 mt-1">{review.reviewText}</div>
                  <div className="text-gray-400 text-xs mt-1">
                    {new Date(review.created_at).toLocaleString()}
                  </div>
                  {review.images.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {review.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="review"
                          className="w-16 h-16 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteReview(review._id)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  DELETE
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
