// Runtime configuration, fetched before the module finishes evaluating so
// every consumer sees a resolved gateway URL. Kept out of the bundle on
// purpose: the same build is deployed to every environment, only the file
// served next to it changes. In dev there is none, hence the localhost
// fallback below.
const config = await fetch("/config.json")
  .then((r) => (r.ok ? r.json() : null))
  .catch(() => null);

if (!config && !import.meta.env.DEV) {
  throw new Error("config.json unreachable");
}

const GATEWAY_URL: string = config?.gateway_url ?? "http://localhost:8080/api";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Thrown for every non-2xx response. Carries the status and the parsed body
 * alongside the message so callers can branch on the exact failure — a 403 on
 * a private profile, a 409 on an already-sent friend request — instead of
 * matching on text.
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
 * Best-effort human-readable message for a failed response. NestJS answers
 * with a plain string, or an array of them when class-validator rejects a
 * body; anything else falls back to the bare status.
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

/**
 * Registers the app-wide reaction to an unhandled API failure. Set once by
 * ApiErrorRedirect, which turns the status into a navigation; passing `null`
 * clears it on unmount.
 */

const setApiErrorHandler = (handler: ((status: number) => void) | null) => {
  onUnhandledApiError = handler;
};

/**
 * Single entry point to the gateway, and the function SWR is configured with.
 * Always sends the session cookie, resolves a 204 to `null` (SWR needs a
 * value, not `undefined`, to consider the key loaded) and throws an
 * {@link ApiError} on anything else that is not 2xx.
 *
 * Failing GETs that no component is expected to handle inline also reach the
 * global handler, which redirects the whole page — see the guards below.
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
 * Shared implementation of the body-carrying verbs. The Content-Type header is
 * only set when there actually is a body: announcing JSON on an empty request
 * leaves the backend parsing nothing, and its validation pipe then rejects the
 * call.
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
 * Uploads a file as multipart/form-data. No Content-Type header on purpose:
 * the browser has to set it itself to append the "boundary=..." parameter, and
 * writing it by hand leaves the backend unable to split the parts.
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
