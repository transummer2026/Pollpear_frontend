import { ApiError, postJson } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";

export function useLogout() {
  return useSWRMutation<void, ApiError, string>(
    "/auth/logout",
    (resource, { arg }) => postJson<void>(resource, arg),
  );
}
