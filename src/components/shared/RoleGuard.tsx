"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";
import type { UserRole } from "@/lib/auth";

interface RoleGuardProps {
  allowedRole: UserRole;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function RoleGuard({
  allowedRole,
  children,
  fallback,
}: RoleGuardProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const user = getUser();

    if (!user) {
      // Not authenticated - redirect to login
      router.push("/login");
      return;
    }

    if (user.role !== allowedRole) {
      // Wrong role - redirect to their dashboard
      router.push(`/${user.role}`);
      return;
    }

    setIsAuthorized(true);
    setIsChecking(false);
  }, [allowedRole, router]);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-teal-200 border-t-teal-600" />
          <p className="text-sm text-slate-500">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-slate-900">
              Access Denied
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              You don&apos;t have permission to access this page.
            </p>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}
