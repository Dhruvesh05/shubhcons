"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
    onClose();
  };

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/add-project", label: "Add Project" },
    { href: "/admin/manage-projects", label: "Manage Projects" },
    { href: "/admin/uploads", label: "Uploads" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:sticky top-0 left-0 h-screen
          w-64 bg-white shadow-lg p-6
          transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto lg:self-start
        `}
      >

        <div className="flex justify-between items-center mb-8 lg:block">
          <h2 className="text-xl font-bold text-gray-900">
            Admin Panel
          </h2>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-2">

          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`p-3 rounded transition-colors ${
                  isActive 
                    ? "bg-red-600 text-white" 
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

        </nav>

        <div className="mt-8 pt-8 border-t space-y-3">
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-800 text-sm block"
            onClick={onClose}
          >
            ← Back to Main Site
          </Link>
          
          <button
            onClick={handleLogout}
            className="w-full text-left text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Logout
          </button>
        </div>

      </aside>
    </>
  );
}