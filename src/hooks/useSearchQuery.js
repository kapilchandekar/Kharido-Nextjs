import { useSearchParams } from "next/navigation";

export const useSearchQuery = () => {
  const queryParams = useSearchParams();
  return queryParams.get("query") || "";
};
