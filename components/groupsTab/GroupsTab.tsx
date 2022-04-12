import Paper from "@mui/material/Paper";
import {Avatar, AvatarGroup, useMediaQuery} from "@mui/material";
import * as React from "react";
import {useSelector} from "react-redux";
import {InitialState} from "../../redux/reducers";
import {EllipseText} from "../ellipseText/EllipseText";
import {ArrowTooltips} from "../tooltip/Tooltip";
import {StyledAvatar} from "../styledAvatar/StyledAvatar";
import {groupsTabsStyles} from "./GroupsTabs.styles";
import {Room} from "../../pages/profile/[id]";

export const GroupsTab = ({ onClickRoom }: { onClickRoom: Function }) => {
  const isBrowser = typeof window !== 'undefined';
  const classes = groupsTabsStyles();
  const { user } = useSelector((state: InitialState)  => state);
  const { fullGroupRooms } = user;
  const mobile = useMediaQuery('(max-width:900px)');
  const element = (room: Room, text: string) => <Paper
    className={classes.userPaper}
    key={room.roomId}
    onClick={() => onClickRoom(room.roomId)}
    elevation={0}
  >
    <AvatarGroup max={3} spacing={'small'} total={room.fullParticipants.length}>
      {room.fullParticipants
        .sort((a, b) => (a.id === user.id ? 0 : 1))
        .map(user => {
          return (
            <StyledAvatar key={user.id} display={'flex'} username={user.username} imagePath={user.imagePath} sx={{marginLeft: '6px'}}/>
          )
        })}
    </AvatarGroup>
    <div style={{
      paddingRight: '5px',
      maxHeight: '100%',
      marginLeft: '12px',
      overflow: 'hidden',
      fontSize: '12px'
    }}
    >
      <EllipseText text={text} maxLine={2}/>
    </div>
  </Paper>

  return <div>
    {isBrowser ? fullGroupRooms
      .map((room) => {
        const text = room.fullParticipants
          .sort((a, b) => (a.id === user.id ? 0 : 1))
          .map(user => user.username)
          .join(', ')
        return mobile ? element(room, text) : <ArrowTooltips
          key={room.roomId}
          text={text}
          placement={'left'}
          element={element(room, text)}
        />
      }) : null
    }
  </div>
}