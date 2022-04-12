import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import * as React from "react";
import {useEffect, useState} from "react";
import Stack from '@mui/material/Stack';

import {ChatInput} from "../chatInput/ChatInput";
import {Room} from "../../pages/profile/[id]";
import {debounce} from "@mui/material";
import Header from "../header/Header";
import {useSelector} from "react-redux";
import {InitialState} from "../../redux/reducers";
import {ServerMessage} from "../../hooks/useNotification";
import {Message} from "./message/Message";
import {chatWindowStyle} from "./ChatWindow.style";

export const ChatWindow = (props: {room: Room, setDrawerOpen: Function}) => {
  const {room, setDrawerOpen} = props;
  const {roomId, groupRoom, avatars} = room;
  const { user, socket } = useSelector((state: InitialState)  => state);
  const [initial, setInitial] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const classes = chatWindowStyle();
  const [messages, setMessages] = useState<ServerMessage[]>(
  [
    {
      messageId: 'initial',
      roomId,
      senderId: 'initial',
      senderUsername: 'initial',
      message: 'initial',
      sendingDate: 'initial',
      senderAvatar: 'initial'
    }
  ]);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  function handleResize() {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth
    })
  }

  const debouncedResize = debounce(() => handleResize(), 100)

  useEffect(() => {
    setIsMounted(true);
    window?.addEventListener('resize', debouncedResize)
    return () => setIsMounted(false);
  }, [])

  useEffect(() => {
    if (!socket || !isMounted) return
    socket.emit('messages:get', { roomId });
  }, [roomId, isMounted])

  useEffect(() => {
    if (roomId === user.id && isMounted) {
      setInitial(true)
      return
    }
  }, [roomId, user.id])

  useEffect(() => {
    if (socket && isMounted) {
      socket.on('messages:add', (serverMessage: ServerMessage[]) => {
        setMessages(prev => {
          if (!prev[0]) {
            return [...serverMessage]
          } else if (prev[0].roomId === serverMessage[0].roomId) {
            return [...prev, ...serverMessage]
          } else {
            return  [...prev]
          }
        })
      });
      socket.on(`messages:get${localStorage.getItem('id')}`, (serverMessages: any) => {
        setMessages([...serverMessages])
      });
    }
  }, [socket, isMounted])

  return <>
    { initial ? null : <Box
    sx={{
      paddingBottom: `calc(100vh - ${window.innerHeight}px)`,
    }}
    className={classes.chatWindowWrapper}
  >
    <Header room={room} setDrawerOpen={setDrawerOpen}/>
    <Paper
      className={classes.chatPaper}
      elevation={0}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1}
      >
        {
          messages.map(item => {
            return item.messageId === 'initial'
              ? null
              : <Message key={item.messageId} user={user} avatars={avatars} item={item} groupRoom={groupRoom}/>
          })
        }
      </Stack>
    </Paper>
    <ChatInput roomId={roomId}/>
  </Box>}</>
}