import {GroupRoomItem} from "../chatFriendsList/groupRoomItem/GroupRoomItem";
import {FriendRoomItem} from "../chatFriendsList/friendRoomItem/FriendRoomItem";
import * as React from "react";
import {FriendRoom, User} from "../../redux/reducers";
import {Room} from "../../pages/profile/[id]";


export const RecentsTab = (
  { fullRooms, user, onClickRoom, onClickUser }:
  { fullRooms: FriendRoom[] | Room[], user: User, onClickRoom: Function, onClickUser: Function }) => {
  return <>
    {fullRooms ? fullRooms.map((room) => {
      if (room.groupRoom && room.fullParticipants) {
        const title = room.fullParticipants
          .filter(participant => (participant.id !== user.id))
          .map(user => user.username)
          .join(', ')
        return <GroupRoomItem clickItem={onClickRoom} key={room.roomId} room={room} title={title}/>
      } else if (!room.groupRoom) {
        return <FriendRoomItem clickItem={onClickUser} key={room.roomId} friend={room}/>
      }
    })
      .slice(0, 7)
    : null}
  </>
}