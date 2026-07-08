import { type RegisterDTO } from "@shared/schemas/auth.schema"
import { ApiError, postJson } from "@/lib/fetcher"
import useSWRMutation from "swr/mutation"

export function useRegister(){
  return useSWRMutation<RegisterDTO, ApiError, string, RegisterDTO>(
    "/auth/register",
    (resource, { arg }) => postJson<RegisterDTO>(resource, arg)
  )
}