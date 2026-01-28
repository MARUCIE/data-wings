/**
 * Data Wings SDK
 *
 * AI-Native open-source data analytics platform
 *
 * @packageDocumentation
 *
 * @example
 * ```typescript
 * import { DataWings } from '@data-wings/sdk';
 *
 * // Initialize the SDK
 * const dw = new DataWings({
 *   apiKey: 'your-api-key',
 * });
 *
 * // Track events
 * dw.track('Button Clicked', { button_id: 'signup' });
 *
 * // Identify users
 * dw.identify('user-123', {
 *   email: 'user@example.com',
 *   name: 'John Doe',
 * });
 *
 * // Track page views (automatic by default)
 * dw.page({ category: 'Blog' });
 * ```
 */

// Main client
export { DataWings } from "./client";

// Types
export type {
  DataWingsOptions,
  EventProperties,
  UserTraits,
  PageProperties,
  EventPayload,
  EventContext,
  Callback,
} from "./types";

// Utilities (for advanced usage)
export { generateId, getTimestamp, buildContext, SDK_VERSION } from "./utils";

// Default export for convenience
export { DataWings as default } from "./client";
