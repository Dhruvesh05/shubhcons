"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Redirect to login if not authenticated and not already on login page
    if (pathname !== '/admin/login' && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router, pathname]);

  // Close sidebar on route change (for mobile)
  useEffect(() => {
    const handleRouteChange = () => {
      setIsSidebarOpen(false);
    };
    handleRouteChange();
  }, [pathname]);

  // If on login page, show login without sidebar/navbar
  if (pathname === '/admin/login') {
    return <div suppressHydrationWarning>{children}</div>;
  }

  // Show consistent layout structure (fixes hydration mismatch)
  return (
    <div className="min-h-screen bg-gray-100 flex" suppressHydrationWarning>
      
      {/* Floating menu button for mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-red-600 text-white p-3 rounded-lg shadow-lg hover:bg-red-700 transition-colors"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main content area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-0 w-full lg:w-auto overflow-x-hidden overflow-y-auto">
        {children}
      </main>

    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}