import { type LoginDTO } from "@shared/schemas/auth.schema"
import { ApiError, postJson } from "@/lib/fetcher"
import useSWRMutation from "swr/mutation"

export function useLogin(){
  return useSWRMutation<LoginDTO, ApiError, string, LoginDTO>(
    "/auth/login",
    (resource, { arg }) => postJson<LoginDTO>(resource, arg)
  )
}