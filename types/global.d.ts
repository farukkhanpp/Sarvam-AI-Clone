import type { ConsentPreferences } from "./ui";

declare global {
  interface WindowEventMap {
    "sarvam:consent-updated": CustomEvent<ConsentPreferences | null>;
  }
}

export {};
