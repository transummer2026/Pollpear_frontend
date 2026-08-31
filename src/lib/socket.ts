import { io, Socket } from "socket.io-client";
import { GATEWAY_URL } from "./fetcher";

let socket: Socket | null = null;

/**
 * The tab's single socket, opened on first use and shared by every hook that
 * listens. Its path is derived from the gateway URL so real-time traffic goes
 * through the same origin and reverse proxy as the REST calls, and the session
 * cookie rides along on the handshake.
 */
function getSocket(): Socket {
  if (!socket) {
    const url = new URL(GATEWAY_URL, window.location.origin);
    socket = io(url.origin, {
      path: `${url.pathname.replace(/\/$/, "")}/ws`,
      transports: ["websocket"],
      withCredentials: true,
    });
  }
  return socket;
}

/**
 * Closes the connection and drops the instance, so the next getSocket() opens a
 * fresh one. Called on logout: the handshake is authenticated, and a socket
 * kept alive would still be the previous user's.
 */
function disconnectSocket(): void {
  socket?.disconnect();
  socket = null;
}

export { getSocket, disconnectSocket };
