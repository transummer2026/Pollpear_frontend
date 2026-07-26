const GATEWAY_URL = import.meta.env.GATEWAY_URL ?? "http://localhost:8080";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * @note:
 *  super(message) // we pass the message to the Error class constructor, to create the instance of the Error class with the message
 */
class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

/**
 * Extracts an error message from the response body, or returns a default message based on the HTTP status code.
 */
const extractErrorMessage = (status: number, body: unknown): string => {
  const message = (body as { message?: unknown } | null)?.message;
  if (typeof message === "string") return message;
  if (Array.isArray(message)) return message.join(", ");
  return `HTTP ${status}`;
};

/**
 * we work with swr and use the classic fetch (instead of other packages/frameworks like axios etc. )
 * This is a minimal fetcher for now to make api calls
 * fetch sends http calls to the url (a bit like a curl) with the options we want.
 *
 * @note:
 *  const body = await res.json().catch(() => null); if we don't receive json, we return null.
 *  if (!res.ok) if response is not 2XX status code, we throw an ApiError.
 *  const res = await fetch(`${API_URL}${resource}`, options) // fetch the data with the back
 */
const fetcher = async <T>(
  resource: string,
  options?: RequestInit,
): Promise<T> => {
  const res = await fetch(`${GATEWAY_URL}${resource}`, {
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(res.status, extractErrorMessage(res.status, body), body);
  }

  if (res.status === 204) return null as T;

  return res.json();
};

/**
 * Function to send JSON data to the server
 */
const sendJson = <T>(
  method: HttpMethod,
  resource: string,
  data?: unknown,
): Promise<T> => {
  return fetcher<T>(resource, {
    method,
    headers:
      data !== undefined ? { "Content-type": "application/json" } : undefined,
    body: data !== undefined ? JSON.stringify(data) : undefined,
  });
};

const postJson = <T>(resource: string, data?: unknown): Promise<T> => {
  return sendJson<T>("POST", resource, data);
};

/**
 * Sends multipart/form-data (file uploads).
 * @note: no Content-Type header on purpose -> the browser sets
 *   "multipart/form-data; boundary=..." itself. Setting it manually breaks the upload.
 */
const postForm = <T>(resource: string, form: FormData): Promise<T> => {
  return fetcher<T>(resource, {
    method: "POST",
    body: form,
  });
};

const putJson = <T>(resource: string, data?: unknown): Promise<T> => {
  return sendJson<T>("PUT", resource, data);
};

const patchJson = <T>(resource: string, data?: unknown): Promise<T> => {
  return sendJson<T>("PATCH", resource, data);
};

const deleteJson = <T>(resource: string, data?: unknown): Promise<T> => {
  return sendJson<T>("DELETE", resource, data);
};

export {
  GATEWAY_URL,
  fetcher,
  postJson,
  postForm,
  putJson,
  patchJson,
  deleteJson,
  ApiError,
};
