import { QueryClient } from "@tanstack/react-query";

// One singleton shared across the whole app.
// If you create a new QueryClient inside a component, every render creates a
// new cache — you lose deduplication and instant re-use across components.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min — data stays "fresh", no refetch on re-focus
      retry: 1,
    },
  },
});
