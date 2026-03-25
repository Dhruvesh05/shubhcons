"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProjectForm from "@/components/admin/ProjectForm";
import { Project } from "@/types/project";
import { buildApiUrl } from "@/utils/config";

export default function EditProjectClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const projectId = searchParams.get("id");
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      setError("Project ID is missing in the URL.");
      return;
    }

    const fetchProject = async () => {
      try {
        const res = await fetch(buildApiUrl(`/api/projects/${projectId}`));
        const result = await res.json();

        if (!res.ok) {
          setError(result.message || "Failed to load project");
          return;
        }

        setProject(result.data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError("Failed to load project. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Edit Project</h1>
        <div className="text-gray-600">Loading project...</div>
      </div>
    );
  }

  if (!projectId || error || !project) {
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Edit Project</h1>
        <div className="bg-red-100 text-red-600 p-4 rounded mb-4">
          {error || "Project not found. Please select a project to edit."}
        </div>
        <Link href="/admin/manage-projects" className="text-blue-600 hover:text-blue-800 underline">
          ← Back to Manage Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit Project</h1>
          <p className="text-sm text-gray-500">Project ID: {projectId}</p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/admin/manage-projects")}
          className="text-blue-600 hover:text-blue-800 underline text-sm"
        >
          ← Back
        </button>
      </div>

      <ProjectForm
        projectId={projectId}
        initialData={{
          name: project.name,
          type: project.type,
          location: project.location,
          locationLink: project.locationLink,
          map3dIframe: project.map3dIframe,
        }}
      />
    </div>
  );
}
