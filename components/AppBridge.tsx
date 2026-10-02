"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/hooks";
import { setOnline, setConsent, codeCopied } from "@/store/slices/uiSlice";
import type { ConsentPreferences } from "@/types/ui";

/**
 * Connects the original (bundled) page scripts to Redux + Toastify
 * WITHOUT changing them: it only listens to events they already emit.
 */
export default function AppBridge(): null {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 1) online / offline
    const onOnline = () => {
      dispatch(setOnline(true));
      toast.success("You're back online");
    };
    const onOffline = () => {
      dispatch(setOnline(false));
      toast.error("You're offline. Some features may not work until you reconnect.");
    };
    dispatch(setOnline(navigator.onLine));
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    // 2) cookie-consent updates (event dispatched by the site's consent module)
    const onConsent = (e: CustomEvent<ConsentPreferences | null>) => {
      dispatch(setConsent(e.detail ?? null));
      toast.info("Cookie preferences saved");
    };
    window.addEventListener("sarvam:consent-updated", onConsent);

    // 3) "Copy code" buttons inside the playground
    const onClick = (e: MouseEvent) => {
      const btn = e.target instanceof Element ? e.target.closest('button[aria-label="Copy code"]') : null;
      if (btn) {
        dispatch(codeCopied());
        toast.success("Code copied to clipboard");
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("sarvam:consent-updated", onConsent);
      document.removeEventListener("click", onClick);
    };
  }, [dispatch]);

  return null;
}
