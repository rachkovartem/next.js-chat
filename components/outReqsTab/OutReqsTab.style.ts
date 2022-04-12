import {makeStyles} from "@material-ui/core/styles";

export const OutReqsTabStyle = makeStyles({
  userPaperNoCursor: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '5px',
    height: 50,
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
        content: '',
        width: '0',
        height: '0',
        borderBottom: '0px solid black'
      },
    }
  },
});