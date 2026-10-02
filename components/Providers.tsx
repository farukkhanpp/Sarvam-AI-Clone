"use client";

import { useRef, type ReactNode } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStore } from "@/store";
import type { AppStore } from "@/types/store";
import AppBridge from "./AppBridge";
import OfflineBanner from "./OfflineBanner";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) storeRef.current = makeStore();

  return (
    <Provider store={storeRef.current}>
      <OfflineBanner />
      {children}
      <AppBridge />
      <ToastContainer position="bottom-right" autoClose={2500} newestOnTop closeOnClick pauseOnHover />
    </Provider>
  );
}
