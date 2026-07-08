"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { icon: 20, text: "text-lg" },
  md: { icon: 24, text: "text-xl" },
  lg: { icon: 32, text: "text-2xl" },
};

export default function Logo({ showText = true, size = "md" }: LogoProps) {
  const { icon, text } = sizeMap[size];

  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-teal-600 text-white shadow-sm group-hover:bg-teal-700 transition-colors">
        <BookOpen size={icon} strokeWidth={2} />
      </div>
      {showText && (
        <span
          className={`font-bold tracking-tight text-slate-900 ${text} hidden sm:inline`}
        >
          NEET Zoology{" "}
          <span className="text-teal-600">QGen</span>
        </span>
      )}
    </Link>
  );
}
