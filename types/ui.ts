/** Cookie-consent choices emitted by the site's consent module. */
export interface ConsentPreferences {
  analytics?: boolean;
  marketing?: boolean;
  functional?: boolean;
  [category: string]: boolean | undefined;
}

/** Shape of the `ui` Redux slice. */
export interface UiState {
  /** Mirrors `navigator.onLine`. */
  online: boolean;
  /** `null` until the visitor makes a cookie choice. */
  consent: ConsentPreferences | null;
  /** How many times a "Copy code" button was used. */
  copyCount: number;
}
