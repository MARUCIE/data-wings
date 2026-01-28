/**
 * Data Wings SDK Client Tests
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { DataWings } from "../client";

// Mock fetch
global.fetch = vi.fn();

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, "localStorage", { value: localStorageMock });

describe("DataWings SDK", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ status: "ok" }),
    });
  });

  describe("initialization", () => {
    it("should throw error if apiKey is not provided", () => {
      expect(() => {
        // @ts-expect-error - testing missing apiKey
        new DataWings({});
      }).toThrow("apiKey is required");
    });

    it("should initialize with valid apiKey", () => {
      const dw = new DataWings({ apiKey: "test-key" });
      expect(dw).toBeInstanceOf(DataWings);
    });

    it("should generate anonymous ID on init", () => {
      new DataWings({ apiKey: "test-key" });
      expect(localStorageMock.getItem("dw_anonymous_id")).toBeTruthy();
    });

    it("should reuse existing anonymous ID", () => {
      localStorageMock.setItem("dw_anonymous_id", "existing-id");
      new DataWings({ apiKey: "test-key" });
      expect(localStorageMock.getItem("dw_anonymous_id")).toBe("existing-id");
    });
  });

  describe("track()", () => {
    it("should queue events for batch sending", () => {
      const dw = new DataWings({
        apiKey: "test-key",
        autocapture: false, // Disable to isolate test
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
        batch: false, // Disable batching for immediate send
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

      expect(localStorageMock.getItem("dw_user_id")).toBe("user-123");
    });

    it("should store user traits", () => {
      const dw = new DataWings({ apiKey: "test-key", autocapture: false });

      dw.identify("user-123", { email: "test@example.com", plan: "premium" });

      const traits = JSON.parse(
        localStorageMock.getItem("dw_user_traits") || "{}"
      );
      expect(traits.email).toBe("test@example.com");
      expect(traits.plan).toBe("premium");
    });

    it("should merge traits on subsequent identify calls", () => {
      const dw = new DataWings({ apiKey: "test-key", autocapture: false });

      dw.identify("user-123", { email: "test@example.com" });
      dw.identify("user-123", { plan: "premium" });

      const traits = JSON.parse(
        localStorageMock.getItem("dw_user_traits") || "{}"
      );
      expect(traits.email).toBe("test@example.com");
      expect(traits.plan).toBe("premium");
    });
  });

  describe("reset()", () => {
    it("should clear user identification", () => {
      const dw = new DataWings({ apiKey: "test-key", autocapture: false });

      dw.identify("user-123", { email: "test@example.com" });
      dw.reset();

      expect(localStorageMock.getItem("dw_user_id")).toBeNull();
      expect(localStorageMock.getItem("dw_user_traits")).toBeNull();
    });

    it("should generate new anonymous ID after reset", () => {
      const dw = new DataWings({ apiKey: "test-key", autocapture: false });

      const originalId = localStorageMock.getItem("dw_anonymous_id");
      dw.reset();
      const newId = localStorageMock.getItem("dw_anonymous_id");

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
        batchSize: 100, // High to prevent auto-flush
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
