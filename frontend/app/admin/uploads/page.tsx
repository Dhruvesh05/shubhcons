"use client";

import { useState } from "react";
import { buildApiUrl } from "@/utils/config";

export default function UploadsPage() {

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpload = async () => {

    if (!image) {
      setError("Please select an image to upload");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch(buildApiUrl("/api/uploads"), {
        method: "POST",
        body: formData
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Upload failed");
      }

      setSuccess("Image uploaded successfully!");
      setImage(null);
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
        Upload Site Update
      </h1>

      <div className="max-w-2xl bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded text-sm sm:text-base">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-600 p-3 rounded text-sm sm:text-base">
            {success}
          </div>
        )}

        <div>
          <label className="block mb-2 font-medium text-gray-900 text-sm sm:text-base">Select Image</label>
          <input
            type="file"
            accept="image/*"
            className="border p-2 w-full rounded text-gray-900 text-sm sm:text-base file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading || !image}
          className="bg-blue-600 text-white px-6 py-2 sm:py-3 rounded hover:bg-blue-700 disabled:bg-gray-400 w-full text-sm sm:text-base font-medium"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>

      </div>

    </div>
  );
}