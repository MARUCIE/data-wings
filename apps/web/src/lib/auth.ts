export type UserRole = "admin" | "analyst" | "pm" | "engineer";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface AuthPayload {
  token: string;
  user: AuthUser;
}

const AUTH_STORAGE_KEY = "datawings_auth";

export function getAuth(): AuthPayload | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthPayload;
  } catch {
    return null;
  }
}

export function setAuth(payload: AuthPayload) {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getAuthToken(): string | null {
  return getAuth()?.token ?? null;
}

export function getAuthUser(): AuthUser | null {
  return getAuth()?.user ?? null;
}

export function isAuthenticated(): boolean {
  return Boolean(getAuthToken());
}

export function hasRole(role: UserRole): boolean {
  const user = getAuthUser();
  return Boolean(user && user.role === role);
}
