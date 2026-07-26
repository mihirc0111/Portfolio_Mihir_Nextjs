"use client";

import { Suspense } from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "@/store/store";
import { useAnalytics } from "@/lib/analytics";
import { useWebVitals } from "@/lib/webVitals";

function AnalyticsContent({ children }: { children: React.ReactNode }) {
  useAnalytics();
  useWebVitals();

  return <>{children}</>;
}

function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent>{children}</AnalyticsContent>
    </Suspense>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </Provider>
    </SessionProvider>
  );
}
