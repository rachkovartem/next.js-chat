import {useCallback} from "react";
import {Avatar, useMediaQuery} from "@mui/material";
import * as React from "react";
import {useSnackbar} from "notistack";
import {useRouter} from "next/router";
import {url} from "../helpers/constants";

export interface ServerMessage {
  messageId: string,
  roomId: string,
  senderId: string,
  senderUsername: string,
  message: string,
  sendingDate: string,
  senderAvatar: string,
}

export const useNotification= () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const mobile = useMediaQuery('(max-width:1000px)');

  const showNotification = useCallback((notification: ServerMessage | null) => {
    if (notification && !mobile) {
      enqueueSnackbar(<div
      style={{
        cursor: 'pointer',
      }}
      onClick={() => router.push(`/room/${notification?.roomId}`)}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }}>
          <Avatar
            alt="Avatar"
            src={notification ? notification.senderAvatar : ``}
          />
          <div
            style={{
              maxWidth: '288px',
              marginLeft: '10px',
              fontWeight: 'bold',
            }}
          >
          </div>
          {notification?.senderUsername}
        </div>
        <div
          style={{maxWidth: '288px'}}
        >
          {notification?.message}
        </div>
      </div>, {
        onClick: () => router.push(`/room/${notification?.roomId}`),
        style: { cursor: 'pointer' },
      });
    }
  }, [])

  return {
    showNotification
  }
}