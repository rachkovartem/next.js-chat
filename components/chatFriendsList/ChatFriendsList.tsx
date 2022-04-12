import * as React from "react";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

import ApiServices from "../../services/ApiServices";
import {setChatWindowLoading, setCurrentRoomId, setFullRooms, updateFullRooms} from "../../redux/actions";
import {setCurrentRoom} from "../../redux/actions";
import {InitialState} from "../../redux/reducers";
import {FriendRoomItem} from "./friendRoomItem/FriendRoomItem";
import {GroupRoomItem} from "./groupRoomItem/GroupRoomItem";
import {ServerMessage} from "../../hooks/useNotification";

export const ChatFriendList = ({setDrawerOpen} : {setDrawerOpen?: Function}) => {
  const dispatch = useDispatch();
  const { getAllUserRooms, getRoomInfo } = ApiServices();
  const router = useRouter();
  const { currentRoomId, socket, user, fullRooms } = useSelector((state: InitialState)  => state);

  const loadRoomsInfo = async () => {
    if (user.id) {
      const res = await getAllUserRooms(user.id);
      dispatch(setFullRooms(res.data))
    }
  }

  const clickItem = async (roomId: string) => {
    if (setDrawerOpen) setDrawerOpen(false);
    if (roomId === currentRoomId) return
    dispatch(setCurrentRoomId(roomId));
    dispatch(setChatWindowLoading(true));
    await router.push(`/room/${roomId}`,undefined, { shallow: true });
    const room = await getRoomInfo(roomId);
    dispatch(setCurrentRoom(room.data));
    dispatch(setChatWindowLoading(false));
  }

  useEffect(() => {
    loadRoomsInfo()
  }, [user.id])

  useEffect(() => {
    if (socket) {
      socket.on('messages:add', (serverMessage: ServerMessage[]) => {
        dispatch(updateFullRooms(serverMessage[0].roomId))
      });
    }
  }, [socket])

  return <>
      {fullRooms.map((room) => {
        if (room.groupRoom && room.fullParticipants) {
          const title = room.fullParticipants
            .filter(participant => (participant.id !== user.id))
            .map(user => user.username)
            .join(', ')
          return <GroupRoomItem clickItem={clickItem} key={room.roomId} room={room} title={title}/>
        } else if (!room.groupRoom) {
          return <FriendRoomItem clickItem={clickItem} key={room.roomId} friend={room}/>
        }
      })}
    </>
}