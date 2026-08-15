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
  ApiKeyRenameDTO,
} from "@shared/schemas/api-key.schema";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const API_KEY_ROUTE = "/me/settings/security/apikey";

/**
 * GET the metadata of the current API key. A null answer means no active key
 */
export function useApiKey(
  options: SWRConfiguration<ApiKeyDTO | null, ApiError> = {},
) {
  return useSWR<ApiKeyDTO | null, ApiError>(API_KEY_ROUTE, fetcher, {
    ...options,
  });
}

/**
 * POST a new API key. The response carries the key in clear text
 */
export function useApiKeyCreate() {
  return useSWRMutation<ApiKeyCreatedDTO, ApiError, string, ApiKeyCreateDTO>(
    API_KEY_ROUTE,
    (resource, { arg }) => postJson<ApiKeyCreatedDTO>(resource, arg),
  );
}

/**
 * PATCH the name of the current API key. The key itself is untouched
 */
export function useApiKeyRename() {
  return useSWRMutation<ApiKeyDTO, ApiError, string, ApiKeyRenameDTO>(
    API_KEY_ROUTE,
    (resource, { arg }) => patchJson<ApiKeyDTO>(resource, arg),
  );
}

/**
 * DELETE the current API key. The server answers 204, so there is no payload
 */
export function useApiKeyRevoke() {
  return useSWRMutation<null, ApiError, string, never>(
    API_KEY_ROUTE,
    (resource) => deleteJson<null>(resource),
  );
}
