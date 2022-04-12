import {AvatarGroup, Fab, useMediaQuery} from "@mui/material";
import * as React from 'react';
import ChatIcon from '@mui/icons-material/Chat';

import {useSelector} from "react-redux";
import {InitialState} from "../../redux/reducers";
import {StyledAvatar} from "../styledAvatar/StyledAvatar";

export default function Header(props: { room: any | null, setDrawerOpen: Function}) {
  const { user } = useSelector((state: InitialState)  => state);
  const { room, setDrawerOpen } = props;
  const mobile = useMediaQuery('(max-width:900px)');

  const avatar = (participant: {id: string, imagePath: string, username: string}) =>
    <StyledAvatar
      key={participant.id}
      display={'flex'}
      username={participant.username}
      imagePath={participant.imagePath}
      sx={{marginLeft: '6px'}}
    />

  const mobileDrawerButton = mobile
    ? <Fab
      sx={{
        marginLeft: '10px',
        flexShrink: 0
      }}
      color='primary'
      size='small'
      onClick={() => setDrawerOpen(true)}
    >
      <ChatIcon />
    </Fab>
    : null;

  return room && user.id
    ? room.groupRoom
      ? <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          backgroundColor: '#EAEAEA',
        }}
      >
        {mobileDrawerButton}
        <AvatarGroup sx={{
          margin: '5px 0 5px 10px',
          justifyContent: 'flex-end',
        }} max={4} spacing={'small'} total={room.participants.length}>
          {
            room.participants
              .filter((participant: any) => participant.id !== user.id)
              .map((participant: any) => {
                return avatar(participant)
              })
          }
        </AvatarGroup>
        <p style={{margin: '0 0 0 10px'}}>{room.roomId}</p>
      </div>
      : <div style={{
        width: '100%',
        backgroundColor: '#EAEAEA',
        display: 'flex',
        alignItems: 'center',
      }}>
        {mobileDrawerButton}
        <div style={{margin: 'auto'}}>
          <div>
            {room.participants.filter((participant: any) => participant.id !== user.id).map((participant: any) =>
              {
                return (
                  <div
                    key={participant.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '5px',
                      marginBottom: '5px',
                    }}
                  >
                    {avatar(participant)}
                    <div style={{marginLeft: '12px'}}>{participant.username}</div>
                  </div>)
              })
            }
          </div>
        </div>
      </div>
    : null
}