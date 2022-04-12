import {Chip} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Paper from "@mui/material/Paper";
import * as React from "react";
import {GroupChatInputStyle} from "./GroupChatInput.style";
import {User} from "../../redux/reducers";

export const GroupChatInput = (
  {
    groupChatMembers,
    onClickCreateGroupChat,
    setGroupChatMembers,
    user
  } : {
    groupChatMembers: {username: string, id: string}[],
    onClickCreateGroupChat: Function,
    setGroupChatMembers: React.Dispatch<any>,
    user: User
  }) => {
  const classes = GroupChatInputStyle();

  return <Paper className={classes.groupChatPaper}>
    {
      groupChatMembers.map((member) => {
        return (
          <Chip
            key={member.id}
            label={member.username}
            onDelete={() =>
              setGroupChatMembers(
                (prevState: {username: string, id: string}[]) =>
                  prevState.filter(item => item.id !== member.id)
              )}
          />
        );
      })
    }
    <AddCircleIcon
      sx={{
        alignSelf: 'center',
        marginLeft: 'auto',
        cursor: 'pointer'
      }}
      onClick={() => onClickCreateGroupChat(
        [...groupChatMembers, { username: user.username, id: user.id }],
        user.id
      )}
    />
  </Paper>
}