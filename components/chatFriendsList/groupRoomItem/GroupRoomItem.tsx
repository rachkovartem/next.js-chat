import {EllipseText} from "../../ellipseText/EllipseText";
import Paper from "@mui/material/Paper";
import * as React from "react";
import {Room} from "../../../pages/profile/[id]";
import {useEffect, useState} from "react";
import {FriendRoom, InitialState} from "../../../redux/reducers";
import {useSelector} from "react-redux";
import {ServerMessage} from "../../../hooks/useNotification";
import {StyledAvatar} from "../../styledAvatar/StyledAvatar";
import {itemStyle} from "../ChatFriendList.style";
import {useMediaQuery} from "@mui/material";

export const GroupRoomItem = (
  {
    room,
    title,
    clickItem
  } : {
    room: Room | FriendRoom,
    title: string,
    clickItem: Function,
  }) => {

  const [lastMessage, setLastMessage] = useState(room.lastMessage);
  const [isMounted, setIsMounted] = useState(false);
  const { currentRoomId, socket } = useSelector((state: InitialState)  => state);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (socket && isMounted) {
      socket.on('messages:add', (serverMessage: ServerMessage[]) => {
        if (serverMessage[0].roomId === room.roomId) {
          setLastMessage(serverMessage[0])
        }
      });
    }
  }, [socket, isMounted]);

  return <Paper
    sx={itemStyle(currentRoomId, room)}
    key={room.roomId}
    onClick={() => clickItem(room.roomId)}
    elevation={0}
    data-testid="roomItem"
  >
    <StyledAvatar key={room.roomId} display={'flex'} username={room.roomId} imagePath={''} sx={{marginLeft: '6px'}}/>
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '1fr 1fr',
        paddingRight: '5px',
        maxHeight: '100%',
        marginLeft: '12px',
        overflow: 'hidden',
        fontSize: '12px'
      }}
    >
      <div
        style={{
          fontWeight: 'bold',
          width: '100%',
        }}>
        <EllipseText text={title} maxLine={1}/>
      </div>
      <div>{lastMessage.message}</div>
    </div>
  </Paper>
}