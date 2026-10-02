"use client";

import { useAppSelector } from "@/store/hooks";

/** Small, accessible notice shown only while the visitor has no connection. */
export default function OfflineBanner() {
  const online = useAppSelector((state) => state.ui.online);
  if (online) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: "8px 16px",
        textAlign: "center",
        fontSize: 14,
        color: "#fff",
        background: "#b42318",
      }}
    >
      You&apos;re offline. Reconnect to keep using the site.
    </div>
  );
}
