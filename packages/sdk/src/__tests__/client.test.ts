/**
 * Data Wings SDK Client Tests
 */

import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { DataWings } from "../client";
import { STORAGE_KEYS } from "../storage";

// Mock fetch
global.fetch = vi.fn();

// Create localStorage mock
const createLocalStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
    _getStore: () => store,
  };
};

// Setup global mocks for browser environment
const setupBrowserMocks = () => {
  const localStorageMock = createLocalStorageMock();

  // Mock window and localStorage
  Object.defineProperty(global, "window", {
    value: {
      location: {
        protocol: "https:",
        href: "https://example.com/test",
        pathname: "/test",
        search: "",
      },
      document: {
        title: "Test Page",
        referrer: "",
      },
      history: {
        pushState: vi.fn(),
        replaceState: vi.fn(),
      },
      addEventListener: vi.fn(),
    },
    writable: true,
  });

  Object.defineProperty(global, "localStorage", {
    value: localStorageMock,
    writable: true,
  });

  Object.defineProperty(global, "document", {
    value: {
      title: "Test Page",
      referrer: "",
      addEventListener: vi.fn(),
    },
    writable: true,
  });

  Object.defineProperty(global, "history", {
    value: {
      pushState: vi.fn(),
      replaceState: vi.fn(),
    },
    writable: true,
  });

  Object.defineProperty(global, "navigator", {
    value: {
      userAgent: "test-agent",
      language: "en-US",
    },
    writable: true,
  });

  Object.defineProperty(global, "screen", {
    value: {
      width: 1920,
      height: 1080,
    },
    writable: true,
  });

  return localStorageMock;
};

describe("DataWings SDK", () => {
  let localStorageMock: ReturnType<typeof createLocalStorageMock>;

  beforeEach(() => {
    localStorageMock = setupBrowserMocks();
    vi.clearAllMocks();
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ status: "ok" }),
    });
  });

  afterEach(() => {
    // Clean up
    vi.clearAllMocks();
  });

  describe("initialization", () => {
    it("should throw error if apiKey is not provided", () => {
      expect(() => {
        // @ts-expect-error - testing missing apiKey
        new DataWings({});
      }).toThrow("apiKey is required");
    });

    it("should initialize with valid apiKey", () => {
      const dw = new DataWings({ apiKey: "test-key", autocapture: false });
      expect(dw).toBeInstanceOf(DataWings);
    });

    it("should generate anonymous ID on init", () => {
      new DataWings({ apiKey: "test-key", autocapture: false });
      const key = "dw_" + STORAGE_KEYS.ANONYMOUS_ID;
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        key,
        expect.any(String)
      );
    });

    it("should reuse existing anonymous ID", () => {
      const existingId = "existing-id";
      const key = "dw_" + STORAGE_KEYS.ANONYMOUS_ID;
      localStorageMock._getStore()[key] = existingId;

      new DataWings({ apiKey: "test-key", autocapture: false });

      // Should have called getItem but not setItem for anonymous ID
      expect(localStorageMock.getItem).toHaveBeenCalledWith(key);
      // The existing ID should be preserved
      expect(localStorageMock._getStore()[key]).toBe(existingId);
    });
  });

  describe("track()", () => {
    it("should queue events for batch sending", () => {
      const dw = new DataWings({
        apiKey: "test-key",
        autocapture: false,
        batch: true,
        batchSize: 10,
      });

      dw.track("Test Event", { foo: "bar" });

      // Event should be queued, not sent yet
      expect(fetch).not.toHaveBeenCalled();
    });

    it("should flush when batch size is reached", () => {
      const dw = new DataWings({
        apiKey: "test-key",
        autocapture: false,
        batch: true,
        batchSize: 2,
        flushInterval: 0,
      });

      dw.track("Event 1");
      dw.track("Event 2"); // Should trigger flush

      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should include event properties", () => {
      const dw = new DataWings({
        apiKey: "test-key",
        autocapture: false,
        batch: false,
      });

      dw.track("Purchase", { amount: 99.99, currency: "USD" });
      dw.flush();

      expect(fetch).toHaveBeenCalled();
      const body = JSON.parse(
        (fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body
      );
      const event = body.events[0];

      expect(event.event_name).toBe("Purchase");
      expect(event.properties.amount).toBe(99.99);
      expect(event.properties.currency).toBe("USD");
    });
  });

  describe("identify()", () => {
    it("should store user ID", () => {
      const dw = new DataWings({ apiKey: "test-key", autocapture: false });

      dw.identify("user-123", { email: "test@example.com" });

      const key = "dw_" + STORAGE_KEYS.USER_ID;
      expect(localStorageMock.setItem).toHaveBeenCalledWith(key, "user-123");
    });

    it("should store user traits", () => {
      const dw = new DataWings({ apiKey: "test-key", autocapture: false });

      dw.identify("user-123", { email: "test@example.com", plan: "premium" });

      const key = "dw_" + STORAGE_KEYS.USER_TRAITS;
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        key,
        expect.stringContaining("test@example.com")
      );
    });

    it("should merge traits on subsequent identify calls", () => {
      const dw = new DataWings({ apiKey: "test-key", autocapture: false });

      dw.identify("user-123", { email: "test@example.com" });
      dw.identify("user-123", { plan: "premium" });

      const key = "dw_" + STORAGE_KEYS.USER_TRAITS;
      const calls = localStorageMock.setItem.mock.calls.filter(
        (call) => call[0] === key
      );

      // Last call should have merged traits
      const lastTraitsCall = calls[calls.length - 1];
      if (lastTraitsCall) {
        const storedTraits = JSON.parse(lastTraitsCall[1]);
        expect(storedTraits.email).toBe("test@example.com");
        expect(storedTraits.plan).toBe("premium");
      }
    });
  });

  describe("reset()", () => {
    it("should clear user identification", () => {
      const dw = new DataWings({ apiKey: "test-key", autocapture: false });

      dw.identify("user-123", { email: "test@example.com" });
      dw.reset();

      const userIdKey = "dw_" + STORAGE_KEYS.USER_ID;
      const traitsKey = "dw_" + STORAGE_KEYS.USER_TRAITS;

      expect(localStorageMock.removeItem).toHaveBeenCalledWith(userIdKey);
      expect(localStorageMock.removeItem).toHaveBeenCalledWith(traitsKey);
    });

    it("should generate new anonymous ID after reset", () => {
      const dw = new DataWings({ apiKey: "test-key", autocapture: false });

      const key = "dw_" + STORAGE_KEYS.ANONYMOUS_ID;

      // Get the first anonymous ID that was set
      const initialCalls = localStorageMock.setItem.mock.calls.filter(
        (call) => call[0] === key
      );
      const originalId = initialCalls[0]?.[1];

      dw.reset();

      // After reset, a new anonymous ID should be set
      const afterResetCalls = localStorageMock.setItem.mock.calls.filter(
        (call) => call[0] === key
      );
      const newId = afterResetCalls[afterResetCalls.length - 1]?.[1];

      expect(newId).toBeTruthy();
      expect(newId).not.toBe(originalId);
    });
  });

  describe("flush()", () => {
    it("should send queued events", async () => {
      const dw = new DataWings({
        apiKey: "test-key",
        autocapture: false,
        batch: true,
        batchSize: 100,
      });

      dw.track("Event 1");
      dw.track("Event 2");

      expect(fetch).not.toHaveBeenCalled();

      dw.flush();

      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should call callback on success", () => {
      const dw = new DataWings({
        apiKey: "test-key",
        autocapture: false,
      });
      const callback = vi.fn();

      dw.track("Test Event");
      dw.flush(callback);

      // Callback should be called (async, but mocked to resolve immediately)
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(callback).toHaveBeenCalled();
          resolve(undefined);
        }, 10);
      });
    });
  });

  describe("shutdown()", () => {
    it("should flush remaining events", () => {
      const dw = new DataWings({
        apiKey: "test-key",
        autocapture: false,
        batch: true,
        batchSize: 100,
      });

      dw.track("Event 1");
      dw.shutdown();

      expect(fetch).toHaveBeenCalled();
    });
  });
});
