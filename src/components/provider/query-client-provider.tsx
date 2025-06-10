"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export function QueryClientWrapper({ children }: { children: ReactNode }) {
  // Create a QueryClient instance (useState ensures it's stable across renders)
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Configure default query options (optional)
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false, // Prevent refetching on window focus
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}