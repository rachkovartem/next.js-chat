import {io, Socket} from "socket.io-client";
import {useMemo, useRef} from "react";
import * as React from "react";
import {setUseChatSateUsersOnline} from "../redux/actions";
import {useDispatch} from "react-redux";
import {url} from "../helpers/constants";

export const useSocket = () => {
  const dispatch = useDispatch();
  const socketRef = useRef<any>(null);
  const isServer = useMemo(() => typeof window === "undefined", []);
  let id: string | null;
  if (!isServer) {
    id = localStorage.getItem('id');
  }

  const createSocket = (): Socket => {
    socketRef.current = io(url || '', {
      extraHeaders: {
        "Authorization": `${localStorage.getItem('access_token')}`
      },
      query: {
        'id': id,
        'cookies': document.cookie,
      },
    })
    socketRef.current.emit('system:connect');
    return socketRef.current
  }

  const setOnlineListeners = ({socket, usersOnline}: {socket: Socket, usersOnline: string[]}) => {
    socket.on('friends:online', (friendsOnline: string[]) => {
      dispatch(setUseChatSateUsersOnline(friendsOnline));
    });

    socket.on('friends:wentOffline', (wentOfflineId: string) => {
      const index = usersOnline.indexOf(wentOfflineId)
      const newArr = [...usersOnline]
      newArr.splice(index, 1);
      dispatch(setUseChatSateUsersOnline(newArr));
    });

    socket.on('friends:wentOnline', (wentOnlineId: string) => {
      const friendsOnline = usersOnline.includes(wentOnlineId) ? usersOnline : [...usersOnline.concat(wentOnlineId)]
      dispatch(setUseChatSateUsersOnline(friendsOnline));
    });
  }

  return {
    createSocket,
    setOnlineListeners
  }
}