"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FilePlus,
  Database,
  History,
  Settings,
  Menu,
  X,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import UserNav from "@/components/shared/UserNav";
import RoleGuard from "@/components/shared/RoleGuard";

const sidebarLinks = [
  {
    href: "/teacher/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/teacher/generate",
    label: "Generate Paper",
    icon: FilePlus,
  },
  {
    href: "/teacher/question-bank",
    label: "Question Bank",
    icon: Database,
  },
  {
    href: "/teacher/export-history",
    label: "Export History",
    icon: History,
  },
  {
    href: "/teacher/settings",
    label: "Settings",
    icon: Settings,
  },
];

function getPageTitle(pathname: string): string {
  const link = sidebarLinks.find((l) => l.href === pathname);
  return link?.label || "Teacher Dashboard";
}

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageTitle = getPageTitle(pathname);

  return (
    <RoleGuard allowedRole="teacher">
      <div className="min-h-screen bg-slate-50 flex">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-60 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Sidebar header */}
          <div className="h-16 flex items-center gap-2 px-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                <GraduationCap size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 leading-tight">
                  Teacher
                </p>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Dashboard
                </p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="ml-auto lg:hidden p-1 rounded-md hover:bg-slate-100 text-slate-400"
            >
              <X size={18} />
            </button>
          </div>

          {/* Sidebar nav */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-teal-50 text-teal-700 border border-teal-200"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon
                    size={17}
                    className={isActive ? "text-teal-600" : "text-slate-400"}
                  />
                  {link.label}
                  {isActive && (
                    <ChevronRight size={14} className="ml-auto text-teal-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="px-3 py-3 border-t border-slate-100">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Logo showText={false} size="sm" />
              <span>Back to Home</span>
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-sm border-b border-slate-200 flex items-center px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden mr-3 p-1.5 rounded-md hover:bg-slate-100 text-slate-500"
            >
              <Menu size={20} />
            </button>

            <div className="flex-1 min-w-0">
              <h1 className="text-base font-semibold text-slate-900 truncate">
                {pageTitle}
              </h1>
            </div>

            <div className="flex items-center gap-3 ml-4">
              <UserNav />
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
