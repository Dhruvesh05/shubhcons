"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Project, ProjectUpdate } from "@/types/project";
import { buildApiUrl } from "@/utils/config";

export default function ProjectUpdatesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const projectId = searchParams.get('id');
  
  const [project, setProject] = useState<Project | null>(null);
  const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch project and updates
  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch project details
        const projectRes = await fetch(buildApiUrl(`/api/projects/${projectId}`));
        const projectResult = await projectRes.json();
        
        if (!projectRes.ok) {
          setError(projectResult.message || "Failed to load project");
          setLoading(false);
          return;
        }
        setProject(projectResult.data);

        // Fetch updates
        const updatesRes = await fetch(buildApiUrl(`/api/projects/${projectId}/updates`));
        const updatesResult = await updatesRes.json();
        
        if (updatesRes.ok) {
          setUpdates(Array.isArray(updatesResult.data) ? updatesResult.data : []);
        } else {
          console.warn('Failed to fetch updates, initializing empty array');
          setUpdates([]);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to load project data. Please ensure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectId || !title.trim() || !description.trim()) {
      setError("Title and description are required");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(buildApiUrl(`/api/projects/${projectId}/updates`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to add update (${response.status})`);
      }

      const responseData = await response.json();
      setUpdates([responseData.data, ...updates]);
      setTitle("");
      setDescription("");
      alert("Update added successfully!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to add update";
      setError(errorMessage);
      console.error("Error adding update:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (updateId: number) => {
    if (!confirm("Are you sure you want to delete this update?")) {
      return;
    }

    try {
      const response = await fetch(
        buildApiUrl(`/api/projects/${projectId}/updates/${updateId}`),
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete update");
      }

      setUpdates(updates.filter(u => u.id !== updateId));
      alert("Update deleted successfully!");
    } catch (error) {
      console.error("Failed to delete update:", error);
      alert("Failed to delete update. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Manage Project Updates</h1>
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!projectId || error || !project) {
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Manage Project Updates</h1>
        <div className="bg-red-100 text-red-600 p-4 rounded mb-4">
          {error || "Project not found. Please select a project."}
        </div>
        <button
          onClick={() => router.push("/admin/manage-projects")}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          ← Back to Manage Projects
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/admin/manage-projects")}
          className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center text-sm"
        >
          ← Back to Manage Projects
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Manage Updates: {project.name}
        </h1>
        <p className="text-gray-600 mt-2">
          {project.type} • {project.location}
        </p>
      </div>

      {/* Add New Update Form */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Update</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block mb-2 font-medium text-gray-900 text-sm sm:text-base">
              Update Title
            </label>
            <input
              type="text"
              placeholder="e.g., Foundation Work Completed"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 sm:p-3 w-full rounded text-gray-900 text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-900 text-sm sm:text-base">
              Description
            </label>
            <textarea
              placeholder="Describe the progress in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="border p-2 sm:p-3 w-full rounded text-gray-900 text-sm sm:text-base resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-green-600 text-white px-6 py-2 sm:py-3 rounded hover:bg-green-700 disabled:bg-gray-400 w-full sm:w-auto font-medium"
          >
            {submitting ? "Adding..." : "Add Update"}
          </button>
        </form>
      </div>

      {/* Updates List */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Progress Updates ({updates.length})
        </h2>

        {updates.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            No updates yet. Add the first update above!
          </p>
        ) : (
          <div className="space-y-4">
            {updates.map((update) => (
              <div
                key={update.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {update.title}
                  </h3>
                  <div className="flex gap-2">
                    <span className="text-xs text-gray-500">
                      {new Date(update.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleDelete(update.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {update.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
