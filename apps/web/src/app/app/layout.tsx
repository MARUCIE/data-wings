"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAuth, getAuth, type AuthPayload } from "@/lib/auth";
import { cn } from "@/lib/cn";
import { type Route } from "next";

interface NavItem {
  href: Route;
  label: string;
  roles?: Array<AuthPayload["user"]["role"]>;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/app" as Route, label: "Overview" },
  { href: "/app/ask" as Route, label: "Ask AI", roles: ["admin", "analyst", "pm"] },
  { href: "/app/dashboards" as Route, label: "Dashboards" },
  { href: "/app/settings/team" as Route, label: "Team", roles: ["admin"] },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [auth, setAuth] = useState<AuthPayload | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const payload = getAuth();
    if (!payload) {
      router.replace("/login");
      setChecked(true);
      return;
    }
    setAuth(payload);
    setChecked(true);
  }, [router]);

  const visibleItems = useMemo(() => {
    if (!auth) return [];
    return NAV_ITEMS.filter((item) =>
      item.roles ? item.roles.includes(auth.user.role) : true
    );
  }, [auth]);

  if (!checked) {
    return (
      <div className="min-h-dvh bg-slate-50 flex items-center justify-center text-sm text-slate-500">
        Loading workspace...
      </div>
    );
  }

  if (!auth) {
    return null;
  }

  return (
    <div className="min-h-dvh bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm font-semibold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
              >
                Data Wings
              </Link>
              <nav className="hidden md:flex items-center gap-4">
                {visibleItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-sm font-medium rounded px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                        isActive
                          ? "text-primary-700 bg-primary-50"
                          : "text-slate-600 hover:text-slate-900"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span className="hidden sm:inline">{auth.user.email}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                {auth.user.role.toUpperCase()}
              </span>
              <button
                type="button"
                onClick={() => {
                  clearAuth();
                  router.replace("/login");
                }}
                className="text-slate-600 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
