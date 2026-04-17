"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const sidebarWidth = sidebarOpen ? "w-64" : "w-20";
  const contentMargin = sidebarOpen ? "ml-64" : "ml-20";

  const navItems = [
    { href: "/admin", label: "Dashboard", short: "D" },
    { href: "/admin/appointments", label: "Appointments", short: "A" },
    { href: "/admin/services", label: "Services", short: "S" },
    { href: "/admin/customers", label: "Customers", short: "C" },
    { href: "/admin/reports", label: "Reports", short: "R" },
    { href: "/admin/settings", label: "Settings", short: "S" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Fixed Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen ${sidebarWidth} bg-slate-900 text-white border-r border-slate-800 transition-all duration-300 overflow-hidden`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center justify-between gap-2">
              {sidebarOpen && (
                <div>
                  <h1 className="text-xl font-bold">ServicePulse</h1>
                  <p className="text-xs text-slate-300 mt-1">Admin Panel</p>
                </div>
              )}

              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded-lg p-2 hover:bg-slate-800 transition"
              >
                ☰
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "text-slate-200 hover:bg-slate-800"
                  } ${!sidebarOpen ? "text-center" : ""}`}
                >
                  {sidebarOpen ? item.label : item.short}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-700">
            <button
              onClick={handleLogout}
              className={`block w-full rounded-lg px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 ${
                !sidebarOpen ? "text-center" : "text-left"
              }`}
            >
              {sidebarOpen ? "Logout" : "L"}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div
        className={`${contentMargin} transition-all duration-300 min-h-screen`}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm px-6 py-4">
          <h2 className="text-2xl font-bold text-slate-900">Admin Dashboard</h2>
        </header>

        {/* Scrollable Page Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
