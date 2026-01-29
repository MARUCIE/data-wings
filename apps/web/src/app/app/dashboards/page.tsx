"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { api, type Dashboard } from "@/lib/api";
import { cn } from "@/lib/cn";
import { getAuthUser } from "@/lib/auth";

export default function DashboardsPage() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const role = useMemo(() => getAuthUser()?.role, []);
  const canManage = role === "admin" || role === "pm";

  const loadDashboards = async () => {
    setLoading(true);
    const response = await api.dashboards.list();
    if (response.status === "error" || !response.data) {
      setError(response.message || "Failed to load dashboards");
      setLoading(false);
      return;
    }
    setDashboards(response.data.dashboards);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    loadDashboards();
  }, []);

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      setError("Dashboard name is required");
      return;
    }
    const response = await api.dashboards.create({ name, description });
    if (response.status === "error" || !response.data) {
      setError(response.message || "Failed to create dashboard");
      return;
    }
    setName("");
    setDescription("");
    setShowForm(false);
    await loadDashboards();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboards</h1>
          <p className="text-sm text-slate-500">
            View and manage your analytics dashboards
          </p>
        </div>
        {canManage && (
          <button
            type="button"
            onClick={() => setShowForm((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            {showForm ? "Cancel" : "New Dashboard"}
          </button>
        )}
      </div>

      {showForm && canManage && (
        <form
          onSubmit={handleCreate}
          className="rounded-xl border border-slate-200 bg-white p-4 space-y-3"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="description">
              Description
            </label>
            <input
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            Create dashboard
          </button>
        </form>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className={cn("grid gap-4", dashboards.length ? "sm:grid-cols-2" : "")}>
        {loading && (
          <div className="text-sm text-slate-500">Loading dashboards...</div>
        )}

        {!loading && dashboards.length === 0 && (
          <div className="text-sm text-slate-500">No dashboards yet.</div>
        )}

        {dashboards.map((dashboard) => (
          <div
            key={dashboard.id}
            className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col gap-3"
          >
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                {dashboard.name}
              </h3>
              <p className="text-sm text-slate-500">
                {dashboard.description || "Overview dashboard"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/app"
                className="text-sm text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
              >
                Open overview
              </Link>
              <span className="text-xs text-slate-400">ID: {dashboard.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
