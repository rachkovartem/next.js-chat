import {makeStyles} from "@material-ui/core/styles";

export const chatWindowStyle = makeStyles(theme => ({
  chatWindowWrapper: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down(1000)]: {
      height: 'calc(100vh - 56px)',
      marginTop: 56
    },
    [theme.breakpoints.down(550)]: {
      marginTop: 0,
      marginBottom: 56
    },
  },
  chatPaper: {
    marginTop: 0,
    marginBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column-reverse',
    overflowY: 'scroll',
    padding: '10px',
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
  }
}));

