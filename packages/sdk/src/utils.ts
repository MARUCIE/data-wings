/**
 * Utility functions for Data Wings SDK
 */

import type { EventContext } from "./types";

/** SDK version */
export const SDK_VERSION = "0.1.0";

/** Generate a UUID v4 */
export function generateId(): string {
  // Use crypto.randomUUID if available (modern browsers)
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older browsers
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** Get current timestamp in ISO format */
export function getTimestamp(): string {
  return new Date().toISOString();
}

/** Detect device type from user agent */
export function getDeviceType(): "desktop" | "mobile" | "tablet" {
  if (typeof navigator === "undefined") return "desktop";

  const ua = navigator.userAgent.toLowerCase();

  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    return "tablet";
  }

  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) {
    return "mobile";
  }

  return "desktop";
}

/** Parse browser information from user agent */
export function getBrowserInfo(): { name: string; version: string } {
  if (typeof navigator === "undefined") {
    return { name: "unknown", version: "unknown" };
  }

  const ua = navigator.userAgent;
  let name = "unknown";
  let version = "unknown";

  // Chrome
  if (/Chrome\/(\d+)/.test(ua) && !/Edge|Edg|OPR|Opera/.test(ua)) {
    name = "Chrome";
    version = RegExp.$1;
  }
  // Safari
  else if (/Safari\/(\d+)/.test(ua) && !/Chrome/.test(ua)) {
    name = "Safari";
    const vMatch = ua.match(/Version\/(\d+)/);
    version = vMatch ? vMatch[1] : "unknown";
  }
  // Firefox
  else if (/Firefox\/(\d+)/.test(ua)) {
    name = "Firefox";
    version = RegExp.$1;
  }
  // Edge
  else if (/Edg\/(\d+)/.test(ua)) {
    name = "Edge";
    version = RegExp.$1;
  }
  // Opera
  else if (/OPR\/(\d+)/.test(ua)) {
    name = "Opera";
    version = RegExp.$1;
  }

  return { name, version };
}

/** Parse OS information from user agent */
export function getOSInfo(): { name: string; version: string } {
  if (typeof navigator === "undefined") {
    return { name: "unknown", version: "unknown" };
  }

  const ua = navigator.userAgent;
  let name = "unknown";
  let version = "unknown";

  if (/Windows NT (\d+\.\d+)/.test(ua)) {
    name = "Windows";
    const ntVersion = RegExp.$1;
    // Map NT version to Windows version
    const versionMap: Record<string, string> = {
      "10.0": "10/11",
      "6.3": "8.1",
      "6.2": "8",
      "6.1": "7",
    };
    version = versionMap[ntVersion] || ntVersion;
  } else if (/Mac OS X (\d+[._]\d+)/.test(ua)) {
    name = "macOS";
    version = RegExp.$1.replace("_", ".");
  } else if (/Android (\d+\.?\d*)/.test(ua)) {
    name = "Android";
    version = RegExp.$1;
  } else if (/iPhone OS (\d+_\d+)/.test(ua) || /iPad.*OS (\d+_\d+)/.test(ua)) {
    name = "iOS";
    version = RegExp.$1.replace("_", ".");
  } else if (/Linux/.test(ua)) {
    name = "Linux";
    version = "unknown";
  }

  return { name, version };
}

/** Get UTM parameters from URL */
export function getUTMParams(): EventContext["campaign"] | undefined {
  if (typeof window === "undefined") return undefined;

  const params = new URLSearchParams(window.location.search);
  const utm: EventContext["campaign"] = {};

  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");
  const utmTerm = params.get("utm_term");
  const utmContent = params.get("utm_content");

  if (utmSource) utm.source = utmSource;
  if (utmMedium) utm.medium = utmMedium;
  if (utmCampaign) utm.campaign = utmCampaign;
  if (utmTerm) utm.term = utmTerm;
  if (utmContent) utm.content = utmContent;

  return Object.keys(utm).length > 0 ? utm : undefined;
}

/** Get current page information */
export function getPageInfo(): EventContext["page"] {
  if (typeof window === "undefined") {
    return {
      url: "",
      title: "",
      path: "",
      referrer: "",
    };
  }

  return {
    url: window.location.href,
    title: document.title,
    path: window.location.pathname,
    referrer: document.referrer,
  };
}

/** Build complete event context */
export function buildContext(): EventContext {
  const browser = getBrowserInfo();
  const os = getOSInfo();
  const page = getPageInfo();
  const campaign = getUTMParams();

  return {
    page,
    device: {
      type: getDeviceType(),
      screen_width: typeof screen !== "undefined" ? screen.width : 0,
      screen_height: typeof screen !== "undefined" ? screen.height : 0,
    },
    browser: {
      name: browser.name,
      version: browser.version,
    },
    os: {
      name: os.name,
      version: os.version,
    },
    campaign,
    locale:
      typeof navigator !== "undefined" ? navigator.language : "en-US",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    library: {
      name: "@data-wings/sdk",
      version: SDK_VERSION,
    },
  };
}

/** Simple logger with debug mode */
export function createLogger(debug: boolean) {
  return {
    debug: (...args: unknown[]) => {
      if (debug) {
        console.log("[DataWings]", ...args);
      }
    },
    warn: (...args: unknown[]) => {
      console.warn("[DataWings]", ...args);
    },
    error: (...args: unknown[]) => {
      console.error("[DataWings]", ...args);
    },
  };
}
