const config = await fetch("/config.json")
  .then((r) => (r.ok ? r.json() : null))
  .catch(() => null);

if (!config && !import.meta.env.DEV) {
  throw new Error("config.json unreachable");
}

const GATEWAY_URL: string = config?.gateway_url ?? "http://localhost:8080/api";

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

// Matches exactly `/users/:id` (not sub-resources like `/users/:id/friends`):
// a private profile 403s there, which is an expected, common outcome the
// viewing component should render inline, not a full-page redirect.
const isUserProfileResource = (resource: string) =>
  /^\/users\/\d+$/.test(resource);

// `/feed` fails with 503 whenever the recommender is down. That's a
// degraded section, not a broken app, so FeedContent renders it inline
// instead of the whole page bouncing to /server-error. A 401/403 there
// still redirects like anywhere else.
const isFeedResource = (resource: string) =>
  resource === "/feed" || resource.startsWith("/feed?");

let onUnhandledApiError: ((status: number) => void) | null = null;

const setApiErrorHandler = (handler: ((status: number) => void) | null) => {
  onUnhandledApiError = handler;
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
    const method = (options?.method ?? "GET").toUpperCase();
    // "/me" is polled on every page (useAuth) to silently probe whether a
    // session exists; a 401 there just means "logged out" and must never
    // force-navigate the visitor, so it's excluded from the redirect.
    const isServerFault = res.status >= 500;
    if (
      method === "GET" &&
      resource !== "/me" &&
      !isUserProfileResource(resource) &&
      !(isFeedResource(resource) && isServerFault) &&
      (res.status === 401 || res.status === 403 || isServerFault)
    ) {
      onUnhandledApiError?.(res.status);
    }
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
  setApiErrorHandler,
  ApiError,
};
