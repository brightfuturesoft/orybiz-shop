"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";

interface ReviewModalProps {
  isOpen: boolean;
  order_id?: string;
  onClose: () => void;
}

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
}

export default function ReviewModal({
  order_id,
  isOpen,
  onClose,
}: ReviewModalProps) {
  const { user } = useUserStore();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const newFiles: UploadedFile[] = [];
    Array.from(files).forEach((file) => {
      const id = Math.random().toString(36).substr(2, 9);
      const preview = URL.createObjectURL(file);
      newFiles.push({ id, file, preview });
    });
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("reviewText", reviewText);
      formData.append("rating", rating.toString());

      uploadedFiles.forEach((f) => {
        formData.append("images", f.file);
      });
      const payload = {
        ...formData,
        user_id: user?._id,
        workspace_id: user?.workspace_id,
        order_id,
      };
      const res = await fetch("/api/reviews", {
        method: "POST",
        body: payload,
      });
      if (!res.ok) throw new Error("Failed to submit review");

      const data = await res.json();
      console.log("Review Saved:", data);

      toast.success(" Review submitted successfully!");

      // reset
      setReviewText("");
      setRating(5);
      setUploadedFiles([]);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(" Failed to submit review");
    }
  };

  const handleCancel = () => {
    uploadedFiles.forEach((file) => {
      URL.revokeObjectURL(file.preview);
    });
    setReviewText("");
    setRating(5);
    setUploadedFiles([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={handleCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        {/* Close Icon */}
        <button
          onClick={handleCancel}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Write a Review
          </h2>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-4">
          {/* Text Area */}
          <div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* File Upload */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-left text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              Choose Files | {uploadedFiles.length} files
            </button>

            {uploadedFiles.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="relative group">
                    <div className="relative w-16 h-16 rounded border border-gray-200 overflow-hidden">
                      <Image
                        src={file.preview || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <svg
                    className={`w-6 h-6 ${
                      star <= rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    } hover:text-yellow-400 transition-colors`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
