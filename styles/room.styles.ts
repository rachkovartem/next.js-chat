import {makeStyles} from "@material-ui/core/styles";

export const roomStyles = makeStyles(theme => ({
  roomPage: {
    display: 'grid',
    gridTemplateColumns: '88px 1fr',
    maxHeight: '100vh',
    minHeight: '100vh',
    [theme.breakpoints.down(1000)]: {
      display: 'flex',
      flexDirection: 'column-reverse'
    },
    [theme.breakpoints.down(550)]: {
      maxHeight: '100vh',
      display: 'block'
    },
  },
  roomBoxWrapper: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    maxHeight: '100vh',
    height: '100vh',
    [theme.breakpoints.down(901)]: {
      gridTemplateColumns: '1fr',
    },
  },
  roomDrawer: {
    '& .MuiDrawer-paper': {
      maxWidth: '300px',
      width: '300px',
      paddingBottom: 56
    }
  },
  roomBox: {
    paddingLeft: '3px',
    height: '100vh',
    overflowY: 'scroll',
    [theme.breakpoints.between(900, 1000)]: {
      marginTop: 56,
    },
    scrollbarColor: '#a8a8a8 #fff',     /* «цвет ползунка» «цвет полосы скроллбара» */
    scrollbarWidth: 'thin',  /* толщина */
    '&::-webkit-scrollbar': {
      width: '3px', /* ширина для вертикального скролла */
      height: '3px', /* высота для горизонтального скролла */
      backgroundColor: '#fff',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#a8a8a8',
      borderRadius: '9px',
      boxShadow: 'inset 1px 1px 10px #a8a8a8',
    },
  },
  chatViewWrapper: {
    display: 'flex',
    borderLeft: '1px solid #e8e8e8',
    maxHeight: '100vh',
    [theme.breakpoints.down(1000)]: {
      maxHeight: '100%',
    },
    [theme.breakpoints.down(900)]: {
      border: 'none'
    },
  },
}));