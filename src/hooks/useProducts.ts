import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/api";

// The query key ["products"] is the cache identity.
// Any component that calls useProducts() shares the same cached result —
// no duplicate network calls, no duplicate loading states.
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}
