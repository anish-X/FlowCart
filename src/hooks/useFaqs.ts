import { useQuery } from "@tanstack/react-query";
import { fetchFaqs } from "@/services/api";

export function useFaqs() {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFaqs,
  });
}
