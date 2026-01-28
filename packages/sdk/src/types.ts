/**
 * Data Wings SDK Type Definitions
 */

/** SDK initialization options */
export interface DataWingsOptions {
  /** Your Data Wings API key */
  apiKey: string;

  /** API endpoint URL (default: https://api.datawings.io) */
  apiHost?: string;

  /** Enable debug logging (default: false) */
  debug?: boolean;

  /** Automatically capture page views (default: true) */
  autocapture?: boolean;

  /** Automatically capture clicks (default: false) */
  autocaptureClicks?: boolean;

  /** Persistence method for user identification (default: 'localStorage') */
  persistence?: "localStorage" | "sessionStorage" | "cookie" | "memory";

  /** Custom cookie domain for cross-subdomain tracking */
  cookieDomain?: string;

  /** Session timeout in minutes (default: 30) */
  sessionTimeout?: number;

  /** Batch events before sending (default: true) */
  batch?: boolean;

  /** Batch size before auto-flush (default: 10) */
  batchSize?: number;

  /** Batch flush interval in ms (default: 5000) */
  flushInterval?: number;
}

/** Event properties - can be any JSON-serializable object */
export type EventProperties = Record<string, unknown>;

/** User traits for identification */
export interface UserTraits {
  /** User's email address */
  email?: string;

  /** User's display name */
  name?: string;

  /** User's first name */
  firstName?: string;

  /** User's last name */
  lastName?: string;

  /** User's phone number */
  phone?: string;

  /** User's company */
  company?: string;

  /** User's role/title */
  title?: string;

  /** User creation date */
  createdAt?: Date | string;

  /** Custom traits */
  [key: string]: unknown;
}

/** Page view properties */
export interface PageProperties {
  /** Page title (auto-captured) */
  title?: string;

  /** Page URL (auto-captured) */
  url?: string;

  /** Page path (auto-captured) */
  path?: string;

  /** Referrer URL (auto-captured) */
  referrer?: string;

  /** Custom properties */
  [key: string]: unknown;
}

/** Internal event payload sent to API */
export interface EventPayload {
  event_name: string;
  event_time: string;
  user_id?: string;
  anonymous_id: string;
  properties: EventProperties;
  context: EventContext;
}

/** Event context - automatically captured */
export interface EventContext {
  /** Page information */
  page: {
    url: string;
    title: string;
    path: string;
    referrer: string;
  };

  /** Device information */
  device: {
    type: "desktop" | "mobile" | "tablet";
    screen_width: number;
    screen_height: number;
  };

  /** Browser information */
  browser: {
    name: string;
    version: string;
  };

  /** Operating system */
  os: {
    name: string;
    version: string;
  };

  /** UTM parameters */
  campaign?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };

  /** Locale */
  locale: string;

  /** Timezone */
  timezone: string;

  /** SDK information */
  library: {
    name: string;
    version: string;
  };
}

/** Callback function type */
export type Callback = (error?: Error) => void;
