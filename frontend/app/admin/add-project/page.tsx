import ProjectForm from "@/components/admin/ProjectForm";

export default function AddProjectPage() {
  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
        Add New Project
      </h1>

      <ProjectForm />

    </div>
  );
}