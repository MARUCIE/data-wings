/**
 * Storage abstraction for Data Wings SDK
 * Supports localStorage, sessionStorage, cookie, and memory storage
 */

import type { DataWingsOptions } from "./types";

export interface Storage {
  get(key: string): string | null;
  set(key: string, value: string, expiresDays?: number): void;
  remove(key: string): void;
}

/** In-memory storage (fallback) */
class MemoryStorage implements Storage {
  private data: Map<string, string> = new Map();

  get(key: string): string | null {
    return this.data.get(key) ?? null;
  }

  set(key: string, value: string): void {
    this.data.set(key, value);
  }

  remove(key: string): void {
    this.data.delete(key);
  }
}

/** localStorage wrapper */
class LocalStorageWrapper implements Storage {
  private prefix = "dw_";

  get(key: string): string | null {
    try {
      return localStorage.getItem(this.prefix + key);
    } catch {
      return null;
    }
  }

  set(key: string, value: string): void {
    try {
      localStorage.setItem(this.prefix + key, value);
    } catch {
      // Storage full or disabled
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch {
      // Ignore errors
    }
  }
}

/** sessionStorage wrapper */
class SessionStorageWrapper implements Storage {
  private prefix = "dw_";

  get(key: string): string | null {
    try {
      return sessionStorage.getItem(this.prefix + key);
    } catch {
      return null;
    }
  }

  set(key: string, value: string): void {
    try {
      sessionStorage.setItem(this.prefix + key, value);
    } catch {
      // Storage full or disabled
    }
  }

  remove(key: string): void {
    try {
      sessionStorage.removeItem(this.prefix + key);
    } catch {
      // Ignore errors
    }
  }
}

/** Cookie storage wrapper */
class CookieStorage implements Storage {
  private prefix = "dw_";
  private domain?: string;

  constructor(domain?: string) {
    this.domain = domain;
  }

  get(key: string): string | null {
    if (typeof document === "undefined") return null;

    const name = this.prefix + key + "=";
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
      const c = cookie.trim();
      if (c.startsWith(name)) {
        return decodeURIComponent(c.substring(name.length));
      }
    }

    return null;
  }

  set(key: string, value: string, expiresDays = 365): void {
    if (typeof document === "undefined") return;

    const expires = new Date();
    expires.setTime(expires.getTime() + expiresDays * 24 * 60 * 60 * 1000);

    let cookie = `${this.prefix}${key}=${encodeURIComponent(value)}`;
    cookie += `; expires=${expires.toUTCString()}`;
    cookie += "; path=/";
    cookie += "; SameSite=Lax";

    if (this.domain) {
      cookie += `; domain=${this.domain}`;
    }

    // Add Secure flag for HTTPS
    if (
      typeof window !== "undefined" &&
      window.location.protocol === "https:"
    ) {
      cookie += "; Secure";
    }

    document.cookie = cookie;
  }

  remove(key: string): void {
    if (typeof document === "undefined") return;

    let cookie = `${this.prefix}${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    if (this.domain) {
      cookie += `; domain=${this.domain}`;
    }
    document.cookie = cookie;
  }
}

/** Create storage instance based on options */
export function createStorage(options: DataWingsOptions): Storage {
  const persistence = options.persistence || "localStorage";

  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    return new MemoryStorage();
  }

  switch (persistence) {
    case "localStorage":
      try {
        // Test if localStorage is available
        localStorage.setItem("dw_test", "1");
        localStorage.removeItem("dw_test");
        return new LocalStorageWrapper();
      } catch {
        return new MemoryStorage();
      }

    case "sessionStorage":
      try {
        sessionStorage.setItem("dw_test", "1");
        sessionStorage.removeItem("dw_test");
        return new SessionStorageWrapper();
      } catch {
        return new MemoryStorage();
      }

    case "cookie":
      return new CookieStorage(options.cookieDomain);

    case "memory":
    default:
      return new MemoryStorage();
  }
}

/** Storage keys used by the SDK */
export const STORAGE_KEYS = {
  ANONYMOUS_ID: "anonymous_id",
  USER_ID: "user_id",
  USER_TRAITS: "user_traits",
  SESSION_ID: "session_id",
  SESSION_START: "session_start",
  QUEUE: "event_queue",
} as const;
