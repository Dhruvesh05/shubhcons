"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { buildApiUrl } from "@/utils/config";

interface ProjectFormProps {
  projectId?: string;
  initialData?: {
    name: string;
    type: string;
    location: string;
    locationLink?: string;
    map3dIframe?: string;
  };
}

export default function ProjectForm({ projectId, initialData }: ProjectFormProps) {

  const [name, setName] = useState(initialData?.name || "");
  const [type, setType] = useState(initialData?.type || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [locationLink, setLocationLink] = useState(initialData?.locationLink || "");
  const [map3dIframe, setMap3dIframe] = useState(initialData?.map3dIframe || "");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("type", type);
      formData.append("location", location);
      formData.append("locationLink", locationLink);
      formData.append("map3dIframe", map3dIframe);

      if (image) formData.append("image", image);

      const url = projectId
        ? buildApiUrl(`/api/projects/${projectId}`)
        : buildApiUrl("/api/projects");

      const method = projectId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData
      });
      const result = await response.json();

      if (!response.ok) {
        console.error('Backend error:', result);
        throw new Error(result.message || "Failed to save project");
      }

      alert(projectId ? "Project Updated Successfully!" : "Project Added Successfully!");
      
      // Clear form if adding new project
      if (!projectId) {
        setName("");
        setType("");
        setLocation("");
        setLocationLink("");
        setMap3dIframe("");
        setImage(null);
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        // Navigate to manage projects to see the new project
        router.push("/admin/manage-projects");
      } else {
        // Navigate back to manage projects if editing
        router.push("/admin/manage-projects");
      }
    } catch (err) {
      setError("Failed to save project. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-2xl bg-white p-4 sm:p-6 rounded-lg shadow"
    >

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded text-sm sm:text-base">
          {error}
        </div>
      )}

      <div>
        <label className="block mb-2 font-medium text-gray-900 text-sm sm:text-base">Project Name</label>
        <input
          placeholder="Enter project name"
          value={name}
          className="border p-2 sm:p-3 w-full rounded text-gray-900 text-sm sm:text-base"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-900 text-sm sm:text-base">Project Type</label>
        <input
          placeholder="e.g., Residential, Commercial"
          value={type}
          className="border p-2 sm:p-3 w-full rounded text-gray-900 text-sm sm:text-base"
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-900 text-sm sm:text-base">Location</label>
        <input
          placeholder="Enter location"
          value={location}
          className="border p-2 sm:p-3 w-full rounded text-gray-900 text-sm sm:text-base"
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-900 text-sm sm:text-base">Location Link (Google Maps)</label>
        <input
          type="url"
          placeholder="Enter 3D View link (optional)"
          value={locationLink}
          className="border p-2 sm:p-3 w-full rounded text-gray-900 text-sm sm:text-base"
          onChange={(e) => setLocationLink(e.target.value)}
        />
        <p className="text-xs text-gray-500 mt-1">Example: https://maps.google.com/?q=Your+Location</p>
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-900 text-sm sm:text-base">Google 3D Iframe View</label>
        <textarea
          placeholder='Paste full iframe code or embed URL (optional)'
          value={map3dIframe}
          className="border p-2 sm:p-3 w-full rounded text-gray-900 text-sm sm:text-base min-h-28"
          onChange={(e) => setMap3dIframe(e.target.value)}
        />
        <p className="text-xs text-gray-500 mt-1">Example: &lt;iframe src=&quot;https://www.google.com/maps/embed?...&quot;&gt;&lt;/iframe&gt;</p>
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-900 text-sm sm:text-base">Project Image</label>
        <input
          type="file"
          accept="image/*"
          className="border p-2 w-full rounded text-gray-900 text-sm sm:text-base file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 w-full"
      >
        {loading ? "Saving..." : projectId ? "Update Project" : "Save Project"}
      </button>

    </form>
  );
}