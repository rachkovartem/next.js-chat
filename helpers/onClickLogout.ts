import {Socket} from "socket.io-client";
import {NextRouter} from "next/router";
import {DefaultEventsMap} from "@socket.io/component-emitter";

export const onClickLogout = async ({socket, router} : {socket: Socket<DefaultEventsMap, DefaultEventsMap> | null, router: NextRouter}) => {
  socket?.disconnect();
  localStorage.clear();
  document.cookie = 'access_token' + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = 'refresh_token' + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  await router.push(`/`);
}