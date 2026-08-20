import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

/**
 * App-wide client provider mounted once near the root (in `src/routes/__root.tsx`).
 * Better Auth's React client needs no context — this is the mount for Query.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
