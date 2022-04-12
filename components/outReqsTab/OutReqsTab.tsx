import Paper from "@mui/material/Paper";
import {Avatar} from "@mui/material";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import * as React from "react";
import {OutReq} from "../../redux/reducers";
import {OutReqsTabStyle} from "./OutReqsTab.style";

export const OutReqsTab = (
  {
    outReqs,
    onClickRejectReq,
    id
  } : {
    outReqs: OutReq[],
    id: string,
    onClickRejectReq: Function,
  }) => {

  const classes = OutReqsTabStyle();

  return <div style={{width: '100%'}}>
    {outReqs.map((req: any) => {
      return <Paper
        className={classes.userPaperNoCursor}
        key={req.id}
        elevation={0}
      >
        <Avatar
          sx={{marginLeft: '6px'}} alt="Avatar"
          src={req.recipient.imagePath}
        />
        <div
          style={{marginLeft: '12px'}}>{req.recipient.username}
        </div>
        <RemoveCircleOutlineRoundedIcon
          sx={{marginLeft: 'auto', marginRight: '10px', width: '18px', cursor: 'pointer'}}
          onClick={() => onClickRejectReq(id, req.userRecipientId, req.id)}
        />
      </Paper>
    })}
  </div>
}