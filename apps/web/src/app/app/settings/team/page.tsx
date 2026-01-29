"use client";

import { useEffect, useMemo, useState } from "react";
import { api, type TeamMember } from "@/lib/api";
import { cn } from "@/lib/cn";
import { getAuthUser, type UserRole } from "@/lib/auth";

const ROLE_OPTIONS: Array<{ value: UserRole; label: string }> = [
  { value: "admin", label: "Admin" },
  { value: "analyst", label: "Analyst" },
  { value: "pm", label: "PM" },
  { value: "engineer", label: "Engineer" },
];

export default function TeamSettingsPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("analyst");

  const currentRole = useMemo(() => getAuthUser()?.role, []);
  const isAdmin = currentRole === "admin";

  const loadMembers = async () => {
    setLoading(true);
    const response = await api.team.list();
    if (response.status === "error" || !response.data) {
      setError(response.message || "Failed to load team");
      setLoading(false);
      return;
    }
    setMembers(response.data.members);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) {
      loadMembers();
    }
  }, [isAdmin]);

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await api.team.create({ email, password, role });
    if (response.status === "error" || !response.data) {
      setError(response.message || "Failed to add member");
      return;
    }
    setEmail("");
    setPassword("");
    setRole("analyst");
    await loadMembers();
  };

  const handleRemove = async (id: string) => {
    const response = await api.team.remove(id);
    if (response.status === "error") {
      setError(response.message || "Failed to remove member");
      return;
    }
    await loadMembers();
  };

  if (!isAdmin) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
        You do not have permission to access Team settings.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Team</h1>
        <p className="text-sm text-slate-500">Manage members and permissions</p>
      </div>

      <form
        onSubmit={handleCreate}
        className="rounded-xl border border-slate-200 bg-white p-4 space-y-3"
      >
        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="password">
              Temporary password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(event) => setRole(event.target.value as UserRole)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              {ROLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          Add member
        </button>
      </form>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className={cn("rounded-xl border border-slate-200 bg-white", loading && "opacity-60")}>
        <div className="border-b border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
          Members
        </div>
        <div className="divide-y divide-slate-200">
          {loading && (
            <div className="px-4 py-3 text-sm text-slate-500">Loading...</div>
          )}
          {!loading && members.length === 0 && (
            <div className="px-4 py-3 text-sm text-slate-500">No members.</div>
          )}
          {members.map((member) => (
            <div key={member.id} className="px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">{member.email}</p>
                <p className="text-xs text-slate-500">Role: {member.role}</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(member.id)}
                className="text-xs text-red-600 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
