import {makeStyles} from "@material-ui/core/styles";
import {boxShadow} from "../helpers/constants";

export const scrollStyle: any = {
  overflowY: 'scroll',
  scrollbarColor: '#a8a8a8 rgba(255,255,255,0)',     /* «цвет ползунка» «цвет полосы скроллбара» */
  scrollbarWidth: 'thin',  /* толщина */
  '&::-webkit-scrollbar': {
    width: '3px', /* ширина для вертикального скролла */
    height: '3px', /* высота для горизонтального скролла */
    backgroundColor: 'rgba(255,255,255,0)',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#a8a8a8',
    borderRadius: '9px',
    boxShadow: 'inset 1px 1px 10px #a8a8a8',
  }
}

export const friendsStyles = makeStyles((theme)=> ({
  friendsPage: {
    display: 'grid',
    gridTemplateColumns: '88px 1fr',
    maxHeight: '100vh',
    backgroundColor: '#EAEAEA',
    [theme.breakpoints.down(1000)]: {
      display: 'flex',
      flexDirection: 'column-reverse'
    },
    [theme.breakpoints.down(550)]: {
      maxHeight: '100%'
    },
  },
  friendsWrapper: {
    maxHeight: '100vh',
    minHeight: 'calc(100vh - 56px)',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)',
    gridTemplateAreas: `
      'groups friends inreqs'
      'groups friends inreqs'
      'recents friends outreqs'
      'recents friends outreqs'
    `,
    gap: '22px',
    padding: '22px',
    [theme.breakpoints.down(1000)]: {
      maxHeight: 'calc(100vh - 56px)',
    },
    [theme.breakpoints.down(750)]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateAreas: `
      'groups friends'
      'groups friends'
      'recents inreqs'
      'recents outreqs'
    `,
    },
    [theme.breakpoints.down(550)]: {
      maxHeight: '100%',
      marginBottom: 56,
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto',
      gridTemplateAreas: `
      'groups'
      'recents'
      'friends'
      'inreqs'
      'outreqs'
    `,
    },
  },
  groupsInputPaperWrapper: {
    height: '100%',
    gridArea: 'groups',
    display: 'flex',
    flexDirection: 'column',
  },
  groupsInputPaper: {
    padding: '5px 10px 10px',
  },
  groupsPaperWrapper: {
    gridArea: 'groups',
    marginTop: '22px',
    borderRadius: '20px',
    overflow: 'hidden',
    height: '100%',
    boxShadow
  },
  groupsPaper: {
    padding: '13px 10px 10px 20px',
    borderRadius: '20px',
    height: '100%',
    ...scrollStyle
  },
  friendsPaperWrapper: {
    gridArea: 'friends',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow,
  },
  friendPaper: {
    padding: '13px 10px 10px 20px',
    borderRadius: '20px',
    height: '100%',
    ...scrollStyle
  },
  recentsPaperWrapper: {
    gridArea: 'recents',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow,
  },
  recentsPaper: {
    padding: '13px 10px 10px 20px',
    borderRadius: '20px',
    height: '100%',
    ...scrollStyle
  },
  inReqsPaperWrapper: {
    gridArea: 'inreqs',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow,
  },
  inReqsPaper: {
    padding: '13px 10px 10px 20px',
    borderRadius: '20px',
    height: '100%',
    ...scrollStyle
  },
  outReqsPaperWrapper: {
    gridArea: 'outreqs',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow,
  },
  outReqsPaper: {
    padding: '13px 10px 10px 20px',
    borderRadius: '20px',
    height: '100%',
    ...scrollStyle
  }
}));