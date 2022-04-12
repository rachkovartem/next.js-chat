import {Avatar, SxProps} from "@mui/material";
import * as React from "react";


export const StyledAvatar = (
  {display, username, imagePath, sx}
    : {display: string, username: string, imagePath: string, sx?: SxProps | undefined}
) => {

  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  return <Avatar
    sx={{
      // marginRight: '5px',
      // alignSelf: 'end',
      display,
      // display: user.id === item.senderId || !groupRoom ? 'none' : 'flex',
      bgcolor: imagePath ? null : stringToColor(username),
      ...sx
    }}
    alt="Avatar"
    src={imagePath}
    // src={avatars[item.senderId]}
  >
    {imagePath ? null : `${username[0]}${username[1]}`}
    {/*{ avatars[item.senderId] ? null : `${item.senderUsername[0]}${item.senderUsername[1]}` }*/}
  </Avatar>
}