import { io, Socket } from "socket.io-client";
import { GATEWAY_URL } from "./fetcher";

let socket: Socket | null = null;

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

function disconnectSocket(): void {
  socket?.disconnect();
  socket = null;
}

export { getSocket, disconnectSocket };
