"use client";

import ProjectTable from "@/components/admin/ProjectTable";
import { useRouter } from "next/navigation";

export default function ManageProjectsPage() {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Manage Projects
        </h1>
        
        <button
          onClick={() => router.refresh()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
        >
          ↻ Refresh
        </button>
      </div>

      <ProjectTable />

    </div>
  );
}