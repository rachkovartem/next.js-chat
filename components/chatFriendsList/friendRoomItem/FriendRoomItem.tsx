import {Avatar, Badge, useMediaQuery} from "@mui/material";
import Paper from "@mui/material/Paper";
import * as React from "react";
import {InitialState} from "../../../redux/reducers";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {ServerMessage} from "../../../hooks/useNotification";
import {EllipseText} from "../../ellipseText/EllipseText";
import {StyledAvatar} from "../../styledAvatar/StyledAvatar";
import {itemStyle} from "../ChatFriendList.style";

export const FriendRoomItem = ({friend, clickItem}: {friend: any, clickItem: Function}) => {
  const { useChatState, currentRoomId, socket, user } = useSelector((state: InitialState)  => state);
  const { usersOnline } = useChatState;
  const [isMounted, setIsMounted] = useState(false);
  const [lastMessage, setLastMessage] = useState(friend.lastMessage)
  const isOnline = (id: string) => usersOnline.some(idOnline => idOnline === id);


  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false)
  }, []);

  useEffect(() => {
    if (socket && isMounted) {
      socket.on('messages:add', (serverMessage: ServerMessage[]) => {
        if (serverMessage[0].roomId === friend.roomId) {
          setLastMessage(serverMessage[0])
        }
      });
    }
  }, [socket, isMounted])

  return <Paper
    sx={itemStyle(currentRoomId, friend)}
    key={friend.id}
    elevation={0}
    onClick={() => clickItem(friend.roomId)}
    data-testid="roomItem"
  >
    <Badge
      sx={{
        marginLeft: '6px',
        '& .MuiBadge-colorSecondary': {
          backgroundColor: '#b2b2b2',
          bottom: '5px',
          left: '5px',
        },
        '& .MuiBadge-colorSuccess': {
          backgroundColor: '#4bb34b',
          bottom: '5px',
          left: '5px',
        }
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      color={isOnline(friend.id) ? "success" : "secondary"}
      variant="dot">
      <StyledAvatar display={'flex'} username={friend.username} imagePath={friend.imagePath}/>
    </Badge>
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '1fr 1fr',
        marginLeft: '12px'
      }}
    >
      <div style={{
        fontSize: '12px',
        fontWeight: 'bold',
      }}>
        {friend.username}
      </div>
      <div style={{
        display: 'flex',
        fontSize: '12px',
      }}>
        {
          lastMessage
            ? <>
              {
              lastMessage.senderId === user.id
                ? <span
                  style={{
                    color: '#939393',
                    marginRight: '3px'
                  }}>Вы:</span>
                : null
              }
              { lastMessage.message ? <EllipseText text={lastMessage.message} maxLine={1}/> : null }
            </>
          : null
        }
      </div>
    </div>
  </Paper>
}