import { ApiError, postJson } from "@/lib/fetcher";
import type {
  ApiKeyDTO,
  ApiKeyCreateDTO,
} from "@shared/schemas/api-key.schema";
import useSWRMutation from "swr/mutation";

const API_KEY_ROUTE = "/me/settings/security/apikey";

export function useApiKeyCreate() {
  return useSWRMutation<ApiKeyDTO, ApiError, string, ApiKeyCreateDTO>(
    API_KEY_ROUTE,
    (resource, { arg }) => postJson<ApiKeyDTO>(resource, arg),
  );
}
