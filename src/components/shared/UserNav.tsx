"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  GraduationCap,
} from "lucide-react";
import { getUser, clearUser, getRoleDisplayName, getRoleBadgeColor } from "@/lib/auth";
import type { User as UserType } from "@/lib/auth";

export default function UserNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUserState] = useState<UserType | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUserState(getUser());
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    clearUser();
    window.location.href = "/";
  }

  if (!user) return null;

  const roleDisplay = getRoleDisplayName(user.role);
  const badgeColor = getRoleBadgeColor(user.role);

  // Get initials from name
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/20"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-700 text-xs font-bold">
          {initials}
        </div>
        <span className="hidden md:inline max-w-[120px] truncate">
          {user.name}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium border ${badgeColor}`}
        >
          {user.role === "teacher" ? (
            <GraduationCap className="mr-0.5 h-3 w-3" />
          ) : null}
          {roleDisplay}
        </span>
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 py-1.5 z-50 animate-fade-in">
          <div className="px-3 py-2 border-b border-slate-100">
            <p className="text-sm font-semibold text-slate-900 truncate">
              {user.name}
            </p>
            <p className="text-xs text-slate-500 capitalize">{roleDisplay}</p>
          </div>

          <div className="py-1">
            <Link
              href={`/${user.role}/profile`}
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-teal-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User size={15} className="text-slate-400" />
              Profile
            </Link>
            <Link
              href={`/${user.role}/settings`}
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-teal-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings size={15} className="text-slate-400" />
              Settings
            </Link>
          </div>

          <div className="border-t border-slate-100 pt-1 mt-1">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
