/**
 * Data Wings API Client
 *
 * Handles all API communication with the backend services.
 */

import { getAuthToken, type AuthUser, type UserRole } from "@/lib/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/** Generic API response wrapper */
interface ApiResponse<T> {
  status: "ok" | "error";
  data?: T;
  message?: string;
  error?: string;
  error_code?: string;
  details?: unknown;
}

/** Fetch wrapper with error handling */
async function fetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const token = getAuthToken();
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options?.headers,
      },
    });

    const raw = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message: raw?.message || raw?.detail || `HTTP ${response.status}`,
        error: raw?.error || raw?.detail,
        error_code: raw?.error_code || `HTTP_${response.status}`,
        details: raw,
      };
    }

    if (raw && typeof raw === "object") {
      if ("status" in raw) {
        const payload = raw as Record<string, unknown> & {
          status: ApiResponse<T>["status"];
        };
        const { status, ...rest } = payload;

        if ("data" in rest) {
          const { data, ...extras } = rest as { data: unknown } & Record<string, unknown>;
          if (Object.keys(extras).length > 0) {
            return {
              status,
              data: { ...extras, data } as T,
            };
          }
          return {
            status,
            data: data as T,
          };
        }

        return {
          status,
          data: rest as T,
        };
      }
    }

    return {
      status: "ok",
      data: raw as T,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Network error",
      error_code: "NETWORK_ERROR",
    };
  }
}

/** Dashboard types */
export interface Dashboard {
  id: string;
  name: string;
  description: string;
  widgets: Widget[];
  created_at: string;
  updated_at: string;
}

export interface Widget {
  id: string;
  type: "chart" | "metric" | "table";
  title: string;
  query: string;
  config: Record<string, unknown>;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface TeamMember {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

/** Analytics types */
export interface OverviewData {
  dau: Array<{ date: string; dau: number }>;
  event_counts: Array<{ event_name: string; count: number }>;
  time_range: {
    start_date: string;
    end_date: string;
  };
}

export interface AskResponse {
  question: string;
  sql: string;
  explanation: string;
  confidence: number;
  data?: Array<Record<string, unknown>>;
  error?: string;
}

/** API Client */
export const api = {
  /** Health check */
  async health(): Promise<ApiResponse<{ status: string; version: string }>> {
    return fetchApi(`${API_BASE_URL}/health`);
  },

  /** Dashboard APIs */
  dashboards: {
    async list(): Promise<ApiResponse<{ dashboards: Dashboard[] }>> {
      return fetchApi(`${API_BASE_URL}/api/v1/dashboards`);
    },

    async get(id: string): Promise<ApiResponse<{ dashboard: Dashboard }>> {
      return fetchApi(`${API_BASE_URL}/api/v1/dashboards/${id}`);
    },

    async create(
      data: Partial<Dashboard>
    ): Promise<ApiResponse<{ dashboard: Dashboard }>> {
      return fetchApi(`${API_BASE_URL}/api/v1/dashboards`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    async update(
      id: string,
      data: Partial<Dashboard>
    ): Promise<ApiResponse<{ dashboard: Dashboard }>> {
      return fetchApi(`${API_BASE_URL}/api/v1/dashboards/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },

    async delete(id: string): Promise<ApiResponse<void>> {
      return fetchApi(`${API_BASE_URL}/api/v1/dashboards/${id}`, {
        method: "DELETE",
      });
    },
  },

  /** Analytics APIs */
  analytics: {
    async overview(
      startDate?: string,
      endDate?: string
    ): Promise<ApiResponse<OverviewData>> {
      const params = new URLSearchParams();
      if (startDate) params.set("start_date", startDate);
      if (endDate) params.set("end_date", endDate);

      const query = params.toString() ? `?${params.toString()}` : "";
      return fetchApi(`${API_BASE_URL}/api/v1/overview${query}`);
    },

    async query(
      sql: string,
      args?: unknown[]
    ): Promise<ApiResponse<{ data: unknown[]; count: number }>> {
      return fetchApi(`${API_BASE_URL}/api/v1/query`, {
        method: "POST",
        body: JSON.stringify({ sql, args }),
      });
    },

    async ask(
      question: string,
      context?: Record<string, unknown>
    ): Promise<AskResponse> {
      const response = await fetchApi<AskResponse>(
        `${API_BASE_URL}/api/v1/ask`,
        {
          method: "POST",
          body: JSON.stringify({ question, context }),
        }
      );

      if (response.status === "error" || !response.data) {
        return {
          question,
          sql: "",
          explanation: "",
          confidence: 0,
          error: response.message,
        };
      }

      return response.data as AskResponse;
    },
  },

  /** Auth APIs */
  auth: {
    async login(
      email: string,
      password: string
    ): Promise<ApiResponse<AuthResponse>> {
      return fetchApi(`${API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    },

    async signup(
      email: string,
      password: string,
      role: UserRole
    ): Promise<ApiResponse<AuthResponse>> {
      return fetchApi(`${API_BASE_URL}/api/v1/auth/signup`, {
        method: "POST",
        body: JSON.stringify({ email, password, role }),
      });
    },

    async me(): Promise<ApiResponse<{ user: AuthUser }>> {
      return fetchApi(`${API_BASE_URL}/api/v1/auth/me`);
    },
  },

  /** Team APIs */
  team: {
    async list(): Promise<ApiResponse<{ members: TeamMember[] }>> {
      return fetchApi(`${API_BASE_URL}/api/v1/team`);
    },

    async create(payload: {
      email: string;
      password: string;
      role: UserRole;
    }): Promise<ApiResponse<{ member: TeamMember }>> {
      return fetchApi(`${API_BASE_URL}/api/v1/team`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },

    async remove(id: string): Promise<ApiResponse<void>> {
      return fetchApi(`${API_BASE_URL}/api/v1/team/${id}`, {
        method: "DELETE",
      });
    },
  },

  /** Event tracking (for testing) */
  events: {
    async track(event: {
      event_name: string;
      user_id?: string;
      anonymous_id: string;
      properties?: Record<string, unknown>;
    }): Promise<ApiResponse<{ event_id: string }>> {
      return fetchApi(`${API_BASE_URL}/api/v1/track`, {
        method: "POST",
        body: JSON.stringify(event),
      });
    },

    async batch(
      events: Array<{
        event_name: string;
        user_id?: string;
        anonymous_id: string;
        properties?: Record<string, unknown>;
      }>
    ): Promise<ApiResponse<{ received: number; stored: number }>> {
      return fetchApi(`${API_BASE_URL}/api/v1/batch`, {
        method: "POST",
        body: JSON.stringify({ events }),
      });
    },
  },
};

export default api;
