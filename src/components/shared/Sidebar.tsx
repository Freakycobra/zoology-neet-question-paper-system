"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  ClipboardCheck,
  Database,
  Download,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/generate", label: "Generate Paper", icon: FileText },
  { href: "/review", label: "Review Papers", icon: ClipboardCheck },
  { href: "/question-bank", label: "Question Bank", icon: Database },
  { href: "/export-history", label: "Export History", icon: Download },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col h-[calc(100vh-4rem)] sticky top-16 bg-slate-100 border-r border-slate-200 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all-smooth",
                isActive
                  ? "bg-teal-50 text-teal-700 border-r-2 border-teal-600"
                  : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon
                className={cn(
                  "shrink-0",
                  isActive ? "text-teal-600" : "text-slate-400",
                  collapsed ? "h-5 w-5" : "h-4.5 w-4.5"
                )}
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-slate-200">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-200/60 hover:text-slate-600 transition-all-smooth"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <div className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span className="text-xs">Collapse</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
