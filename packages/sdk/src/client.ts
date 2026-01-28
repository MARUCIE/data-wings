/**
 * Data Wings SDK Client
 *
 * Main class for event tracking and user identification.
 *
 * @example
 * ```typescript
 * import { DataWings } from '@data-wings/sdk';
 *
 * const dw = new DataWings({
 *   apiKey: 'your-api-key',
 * });
 *
 * // Track events
 * dw.track('Button Clicked', { button_id: 'signup' });
 *
 * // Identify users
 * dw.identify('user-123', { email: 'user@example.com' });
 * ```
 */

import type {
  DataWingsOptions,
  EventProperties,
  UserTraits,
  PageProperties,
  EventPayload,
  Callback,
} from "./types";
import { createStorage, Storage, STORAGE_KEYS } from "./storage";
import {
  generateId,
  getTimestamp,
  buildContext,
  createLogger,
  getPageInfo,
} from "./utils";

const DEFAULT_OPTIONS: Partial<DataWingsOptions> = {
  apiHost: "https://api.datawings.io",
  debug: false,
  autocapture: true,
  autocaptureClicks: false,
  persistence: "localStorage",
  sessionTimeout: 30,
  batch: true,
  batchSize: 10,
  flushInterval: 5000,
};

export class DataWings {
  private options: Required<DataWingsOptions>;
  private storage: Storage;
  private logger: ReturnType<typeof createLogger>;
  private queue: EventPayload[] = [];
  private flushTimer: ReturnType<typeof setInterval> | null = null;
  private initialized = false;

  constructor(options: DataWingsOptions) {
    if (!options.apiKey) {
      throw new Error("DataWings: apiKey is required");
    }

    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    } as Required<DataWingsOptions>;

    this.storage = createStorage(this.options);
    this.logger = createLogger(this.options.debug);

    this.init();
  }

  /** Initialize the SDK */
  private init(): void {
    if (this.initialized) return;

    this.logger.debug("Initializing SDK", { options: this.options });

    // Ensure anonymous ID exists
    this.getAnonymousId();

    // Start session
    this.startSession();

    // Setup batch flushing
    if (this.options.batch && this.options.flushInterval > 0) {
      this.flushTimer = setInterval(() => {
        this.flush();
      }, this.options.flushInterval);
    }

    // Setup autocapture
    if (this.options.autocapture && typeof window !== "undefined") {
      this.setupAutocapture();
    }

    // Track initial page view
    if (this.options.autocapture) {
      this.page();
    }

    this.initialized = true;
    this.logger.debug("SDK initialized");
  }

  /** Get or create anonymous ID */
  private getAnonymousId(): string {
    let anonymousId = this.storage.get(STORAGE_KEYS.ANONYMOUS_ID);

    if (!anonymousId) {
      anonymousId = generateId();
      this.storage.set(STORAGE_KEYS.ANONYMOUS_ID, anonymousId);
      this.logger.debug("Created new anonymous ID", { anonymousId });
    }

    return anonymousId;
  }

  /** Get current user ID (if identified) */
  private getUserId(): string | undefined {
    return this.storage.get(STORAGE_KEYS.USER_ID) ?? undefined;
  }

  /** Start or continue a session */
  private startSession(): void {
    const sessionStart = this.storage.get(STORAGE_KEYS.SESSION_START);
    const sessionId = this.storage.get(STORAGE_KEYS.SESSION_ID);
    const now = Date.now();
    const timeout = this.options.sessionTimeout * 60 * 1000;

    if (sessionStart && sessionId) {
      const lastActivity = parseInt(sessionStart, 10);
      if (now - lastActivity < timeout) {
        // Continue existing session
        this.storage.set(STORAGE_KEYS.SESSION_START, now.toString());
        return;
      }
    }

    // Start new session
    const newSessionId = generateId();
    this.storage.set(STORAGE_KEYS.SESSION_ID, newSessionId);
    this.storage.set(STORAGE_KEYS.SESSION_START, now.toString());
    this.logger.debug("Started new session", { sessionId: newSessionId });
  }

  /** Setup autocapture for page views and clicks */
  private setupAutocapture(): void {
    // Track page views on navigation (SPA support)
    if (typeof window !== "undefined") {
      // History API
      const originalPushState = history.pushState.bind(history);
      history.pushState = (...args) => {
        originalPushState(...args);
        setTimeout(() => this.page(), 0);
      };

      const originalReplaceState = history.replaceState.bind(history);
      history.replaceState = (...args) => {
        originalReplaceState(...args);
        setTimeout(() => this.page(), 0);
      };

      // Popstate (back/forward navigation)
      window.addEventListener("popstate", () => {
        this.page();
      });

      // Click autocapture
      if (this.options.autocaptureClicks) {
        document.addEventListener("click", (event) => {
          this.handleClick(event);
        });
      }
    }
  }

  /** Handle click events for autocapture */
  private handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target) return;

    // Find the nearest clickable element
    const clickable = target.closest("a, button, [data-dw-track]");
    if (!clickable) return;

    const properties: EventProperties = {
      tag_name: clickable.tagName.toLowerCase(),
      text: (clickable.textContent || "").trim().slice(0, 100),
    };

    // Add href for links
    if (clickable instanceof HTMLAnchorElement) {
      properties.href = clickable.href;
    }

    // Add data attributes
    const trackAttr = clickable.getAttribute("data-dw-track");
    if (trackAttr) {
      properties.track_id = trackAttr;
    }

    const trackProps = clickable.getAttribute("data-dw-props");
    if (trackProps) {
      try {
        Object.assign(properties, JSON.parse(trackProps));
      } catch {
        // Ignore invalid JSON
      }
    }

    this.track("$click", properties);
  }

  /**
   * Track a custom event
   *
   * @param eventName - Name of the event (e.g., 'Button Clicked')
   * @param properties - Additional event properties
   * @param callback - Optional callback when event is queued
   *
   * @example
   * ```typescript
   * dw.track('Purchase', {
   *   product_id: 'SKU-123',
   *   price: 99.99,
   *   currency: 'USD',
   * });
   * ```
   */
  track(
    eventName: string,
    properties: EventProperties = {},
    callback?: Callback
  ): void {
    if (!eventName) {
      this.logger.warn("track() called without event name");
      return;
    }

    const payload: EventPayload = {
      event_name: eventName,
      event_time: getTimestamp(),
      user_id: this.getUserId(),
      anonymous_id: this.getAnonymousId(),
      properties,
      context: buildContext(),
    };

    this.enqueue(payload);
    this.logger.debug("Event tracked", { eventName, properties });

    callback?.();
  }

  /**
   * Track a page view
   *
   * @param properties - Optional page properties to override auto-captured values
   *
   * @example
   * ```typescript
   * dw.page({ category: 'Blog' });
   * ```
   */
  page(properties: PageProperties = {}): void {
    const pageInfo = getPageInfo();

    const mergedProperties: PageProperties = {
      title: pageInfo.title,
      url: pageInfo.url,
      path: pageInfo.path,
      referrer: pageInfo.referrer,
      ...properties,
    };

    this.track("$pageview", mergedProperties);
  }

  /**
   * Identify a user with their user ID and traits
   *
   * @param userId - Unique user identifier
   * @param traits - User traits/properties
   * @param callback - Optional callback when identification is complete
   *
   * @example
   * ```typescript
   * dw.identify('user-123', {
   *   email: 'user@example.com',
   *   name: 'John Doe',
   *   plan: 'premium',
   * });
   * ```
   */
  identify(userId: string, traits: UserTraits = {}, callback?: Callback): void {
    if (!userId) {
      this.logger.warn("identify() called without userId");
      return;
    }

    // Store user ID
    this.storage.set(STORAGE_KEYS.USER_ID, userId);

    // Merge and store traits
    const existingTraits = this.getStoredTraits();
    const mergedTraits = { ...existingTraits, ...traits };
    this.storage.set(STORAGE_KEYS.USER_TRAITS, JSON.stringify(mergedTraits));

    // Track identify event
    this.track("$identify", {
      user_id: userId,
      traits: mergedTraits,
    });

    this.logger.debug("User identified", { userId, traits: mergedTraits });

    callback?.();
  }

  /** Get stored user traits */
  private getStoredTraits(): UserTraits {
    const traits = this.storage.get(STORAGE_KEYS.USER_TRAITS);
    if (!traits) return {};

    try {
      return JSON.parse(traits);
    } catch {
      return {};
    }
  }

  /**
   * Reset user identification (logout)
   *
   * Clears user ID, traits, and generates a new anonymous ID.
   *
   * @example
   * ```typescript
   * dw.reset();
   * ```
   */
  reset(): void {
    this.storage.remove(STORAGE_KEYS.USER_ID);
    this.storage.remove(STORAGE_KEYS.USER_TRAITS);
    this.storage.remove(STORAGE_KEYS.ANONYMOUS_ID);
    this.storage.remove(STORAGE_KEYS.SESSION_ID);
    this.storage.remove(STORAGE_KEYS.SESSION_START);

    // Generate new anonymous ID
    this.getAnonymousId();

    // Start new session
    this.startSession();

    this.logger.debug("User reset");
  }

  /**
   * Alias a user ID to the current anonymous ID
   *
   * @param userId - The user ID to alias
   *
   * @example
   * ```typescript
   * // After user signs up, link their new user ID to their anonymous activity
   * dw.alias('user-123');
   * ```
   */
  alias(userId: string): void {
    if (!userId) {
      this.logger.warn("alias() called without userId");
      return;
    }

    this.track("$alias", {
      user_id: userId,
      anonymous_id: this.getAnonymousId(),
    });

    this.logger.debug("User aliased", { userId });
  }

  /**
   * Set global properties that will be included with every event
   *
   * @param properties - Properties to include with all events
   *
   * @example
   * ```typescript
   * dw.setGlobalProperties({
   *   app_version: '1.0.0',
   *   environment: 'production',
   * });
   * ```
   */
  setGlobalProperties(properties: EventProperties): void {
    // This would be stored and merged into every event
    // For simplicity, we'll implement this in a future version
    this.logger.debug("Global properties set", { properties });
  }

  /** Add event to queue */
  private enqueue(payload: EventPayload): void {
    this.queue.push(payload);

    // Auto-flush if queue is full
    if (this.queue.length >= this.options.batchSize) {
      this.flush();
    }
  }

  /**
   * Flush queued events to the server
   *
   * @param callback - Optional callback when flush is complete
   */
  flush(callback?: Callback): void {
    if (this.queue.length === 0) {
      callback?.();
      return;
    }

    const events = [...this.queue];
    this.queue = [];

    this.send(events)
      .then(() => {
        this.logger.debug("Events flushed", { count: events.length });
        callback?.();
      })
      .catch((error) => {
        this.logger.error("Failed to flush events", error);
        // Re-queue failed events
        this.queue.unshift(...events);
        callback?.(error as Error);
      });
  }

  /** Send events to the API */
  private async send(events: EventPayload[]): Promise<void> {
    const url = `${this.options.apiHost}/api/v1/batch`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.options.apiKey}`,
      },
      body: JSON.stringify({ events }),
      keepalive: true, // Ensure events are sent even if page is unloading
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  }

  /**
   * Shutdown the SDK
   *
   * Flushes remaining events and stops the flush timer.
   */
  shutdown(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }

    this.flush();
    this.logger.debug("SDK shutdown");
  }
}
