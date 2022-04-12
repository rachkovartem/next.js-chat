import {makeStyles} from "@material-ui/core/styles";



export const chatInputStyles = makeStyles((theme)=> ({
  chatInputPaper: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '5px',
    width: '100%',
    marginBottom: '10px',
    zIndex: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  chatInputBase: {
    width: '100%',
  },
  chatInputIconButton : {
    p: '10px'
  }
}));