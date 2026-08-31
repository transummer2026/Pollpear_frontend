import {
  deleteJson,
  fetcher,
  patchJson,
  postJson,
  type ApiError,
} from "@/lib/fetcher";
import type {
  ApiKeyCreateDTO,
  ApiKeyCreatedDTO,
  ApiKeyDTO,
  ApiKeyUpdateDTO,
} from "@shared/schemas/api-key.schema";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

// One route for the four verbs, and one SWR key: creating, renaming or
// revoking the key all invalidate the same cache entry.
export const API_KEY_ROUTE = "/me/settings/security/apikey";

/**
 * Metadata of the user's API key — never the key itself. `null` means they have
 * none, which is a normal state, not an error (the backend answers 204).
 */
export function useApiKey(
  options: SWRConfiguration<ApiKeyDTO | null, ApiError> = {},
) {
  return useSWR<ApiKeyDTO | null, ApiError>(API_KEY_ROUTE, fetcher, {
    ...options,
  });
}

/**
 * Issues a key. The response is the only place its clear-text value ever
 * appears — only a hash is stored — so the caller has to show it right away.
 */
export function useApiKeyCreate() {
  return useSWRMutation<ApiKeyCreatedDTO, ApiError, string, ApiKeyCreateDTO>(
    API_KEY_ROUTE,
    (resource, { arg }) => postJson<ApiKeyCreatedDTO>(resource, arg),
  );
}

/** Renames the key. Its value is untouched, so integrations keep working. */
export function useApiKeyUpdate() {
  return useSWRMutation<ApiKeyDTO, ApiError, string, ApiKeyUpdateDTO>(
    API_KEY_ROUTE,
    (resource, { arg }) => patchJson<ApiKeyDTO>(resource, arg),
  );
}

/**
 * Revokes the key, immediately and for good — a new one has to be issued to
 * call the API again. The backend answers 204, hence the `null` result.
 */
export function useApiKeyRevoke() {
  return useSWRMutation<null, ApiError, string, never>(
    API_KEY_ROUTE,
    (resource) => deleteJson<null>(resource),
  );
}
