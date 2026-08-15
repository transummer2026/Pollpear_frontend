import { fetcher, postJson, type ApiError } from "@/lib/fetcher";
import type {
  ApiKeyCreateDTO,
  ApiKeyCreatedDTO,
  ApiKeyDTO,
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
