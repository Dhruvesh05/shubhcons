import { Suspense } from "react";
import EditProjectClient from "@/app/admin/edit-project/client";

export default function EditProjectPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Edit Project</h1>
          <div className="text-gray-600">Loading...</div>
        </div>
      }
    >
      <EditProjectClient />
    </Suspense>
  );
}