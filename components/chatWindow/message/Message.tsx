import {Avatar} from "@mui/material";
import Paper from "@mui/material/Paper";
import * as React from "react";
import {User} from "../../../redux/reducers";
import {ServerMessage} from "../../../hooks/useNotification";
import {StyledAvatar} from "../../styledAvatar/StyledAvatar";

export const Message = (
  { user, avatars, item, groupRoom }:
  { user: User, avatars: {[p: string]: string}, item: ServerMessage, groupRoom: boolean }
) => {
  const getTime = (timestamp: string) => {
    const date = new Date(+timestamp);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    return hours + ':' + minutes.slice(-2)
  }

  return <div
    style={{
      display: 'flex',
      maxWidth: '70%',
      minWidth: '34px',
      alignSelf: user.id === item.senderId ? 'flex-end' : 'inherit'
    }}
  >
    <StyledAvatar
      display={user.id === item.senderId || !groupRoom ? 'none' : 'flex'}
      username={item.senderUsername}
      imagePath={avatars[item.senderId]}
      sx={{
        marginRight: '5px',
        alignSelf: 'end',
      }}
    />
    <Paper
      sx={{
        marginLeft: user.id === item.senderId ? 'auto' : '0',
        maxWidth: '100%',
        minWidth: '34px',
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
        position: 'relative',
        p: '4px 9px 9px',
        lineHeight: '1',
        borderRadius: '10px',
        backgroundColor: user.id === item.senderId ? '#fff' : '#d5d5d5',
      }}
      elevation={2}
    >
      {
        groupRoom && user.id !== item.senderId
          ? <div style={{
            fontSize: '10px',
            fontWeight: '700'
          }}>
            {item.senderUsername}
          </div>
          : null
      }
      <div style={{
        paddingTop: '2px',
        whiteSpace: 'pre-line'
      }}>
        {item.message}
      </div>
      <p style={{
        margin: '0 3px 0 0',
        paddingRight: '3px',
        fontSize: '9px',
        color: '#9b9b9b',
        position: 'absolute',
        bottom: 0,
        right: 0
      }}
      >
        { getTime(item.sendingDate) }
      </p>
    </Paper>
  </div>
}