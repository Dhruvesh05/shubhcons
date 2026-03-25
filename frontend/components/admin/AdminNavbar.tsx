"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface AdminNavbarProps {
  onMenuClick: () => void;
}

export default function AdminNavbar({ onMenuClick }: AdminNavbarProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50 h-16">

      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden text-gray-700 hover:text-gray-900 p-2"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <h1 className="font-semibold text-lg text-gray-900">
        Shubh Construction Admin
      </h1>

      <button 
        onClick={handleLogout}
        className="text-red-600 hover:text-red-800 font-medium px-3 py-2 rounded hover:bg-red-50 transition-colors"
      >
        Logout
      </button>

    </div>
  );
}