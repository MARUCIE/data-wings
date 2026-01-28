# @data-wings/sdk

Data Wings JavaScript/TypeScript SDK for event tracking and analytics.

## Installation

```bash
npm install @data-wings/sdk
# or
pnpm add @data-wings/sdk
# or
yarn add @data-wings/sdk
```

## Quick Start

```typescript
import { DataWings } from '@data-wings/sdk';

// Initialize the SDK
const dw = new DataWings({
  apiKey: 'your-api-key',
});

// Track events
dw.track('Button Clicked', {
  button_id: 'signup',
  page: 'homepage',
});

// Identify users
dw.identify('user-123', {
  email: 'user@example.com',
  name: 'John Doe',
  plan: 'premium',
});

// Track page views (automatic by default)
dw.page({ category: 'Blog' });
```

## Configuration Options

```typescript
const dw = new DataWings({
  // Required
  apiKey: 'your-api-key',

  // Optional
  apiHost: 'https://api.datawings.io', // Custom API endpoint
  debug: false,                         // Enable debug logging
  autocapture: true,                    // Auto-track page views
  autocaptureClicks: false,             // Auto-track clicks
  persistence: 'localStorage',          // Storage method
  sessionTimeout: 30,                   // Session timeout in minutes
  batch: true,                          // Batch events before sending
  batchSize: 10,                        // Events per batch
  flushInterval: 5000,                  // Flush interval in ms
});
```

## API Reference

### `track(eventName, properties?, callback?)`

Track a custom event.

```typescript
dw.track('Purchase', {
  product_id: 'SKU-123',
  price: 99.99,
  currency: 'USD',
});
```

### `page(properties?)`

Track a page view. Called automatically if `autocapture` is enabled.

```typescript
dw.page({
  category: 'Blog',
  author: 'John',
});
```

### `identify(userId, traits?, callback?)`

Identify a user with their unique ID and traits.

```typescript
dw.identify('user-123', {
  email: 'user@example.com',
  name: 'John Doe',
  company: 'Acme Inc',
});
```

### `reset()`

Reset user identification (call on logout).

```typescript
dw.reset();
```

### `alias(userId)`

Link a user ID to the current anonymous ID.

```typescript
// After signup, link the new user to their anonymous activity
dw.alias('user-123');
```

### `flush(callback?)`

Manually flush queued events to the server.

```typescript
dw.flush(() => {
  console.log('Events sent!');
});
```

### `shutdown()`

Shutdown the SDK, flushing remaining events.

```typescript
dw.shutdown();
```

## Auto-Capture

### Page Views

Page views are automatically tracked when:
- The SDK initializes
- The URL changes (SPA navigation via History API)
- The user navigates back/forward

### Click Tracking

Enable click tracking with `autocaptureClicks: true`. Clicks on `<a>`, `<button>`, and elements with `data-dw-track` are captured.

```html
<!-- Custom click tracking -->
<button data-dw-track="cta-signup" data-dw-props='{"variant":"blue"}'>
  Sign Up
</button>
```

## TypeScript Support

The SDK is written in TypeScript and includes full type definitions.

```typescript
import { DataWings, EventProperties, UserTraits } from '@data-wings/sdk';

const properties: EventProperties = {
  product_id: 'SKU-123',
  price: 99.99,
};

const traits: UserTraits = {
  email: 'user@example.com',
  plan: 'premium',
};
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

MIT

---

Data Wings - AI-Native open-source data analytics platform
