import { useMe } from "@/hooks/user/use-me";

export function useAuth() {
  const { data, error, isLoading, mutate } = useMe({
    shouldRetryOnError: false,
  });
  return { data, isLoading, mutate, isAuthenticated: !!data && !error };
}
