import {SxProps} from "@mui/material";

export const itemStyle = (currentRoomId: string | null, room: any): SxProps => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  cursor: 'pointer',
  marginTop: '5px',
  minHeight: '50px',
  backgroundColor: currentRoomId === room.roomId ? '#e8e8e8' : 'rgba(232,232,232,0)',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '33px',
    transform: 'translateX(10%)',
    width: '80%',
    height: '20px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.25)'
  },
  '&:last-child': {
    '&::after': {
      content: '""',
      width: '0',
      height: '0',
      borderBottom: '0px solid black'
    },
  }
})