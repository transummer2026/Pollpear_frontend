import { ApiError, fetcher, postJson } from "@/lib/fetcher";
import type {
  ApiKeyCreateDTO,
  ApiKeyIssuedDTO,
  ApiKeyPublicDTO,
} from "@shared/schemas/api-key.schema";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const API_KEY_ROUTE = "/me/settings/security/apikey";

export function useApiKey() {
  return useSWR<ApiKeyPublicDTO | null, ApiError>(API_KEY_ROUTE, fetcher);
}

export function useApiKeyCreate() {
  return useSWRMutation<ApiKeyIssuedDTO, ApiError, string, ApiKeyCreateDTO>(
    API_KEY_ROUTE,
    (resource, { arg }) => postJson<ApiKeyIssuedDTO>(resource, arg),
  );
}
