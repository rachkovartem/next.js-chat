import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 88;

export const sideBarStyles = makeStyles((theme)=> ({
  sideBarBox: {
    width: drawerWidth,
    height: '100vh',
    boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.08)',
    [theme.breakpoints.down(1000)]: {
      display: 'none'
    },
  },
  sideBarDrawer: {
    '& .MuiDrawer-paper':
      {
        boxSizing: 'border-box',
        width: drawerWidth
      },
  },
  sideBarList: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  sideBarListItem: {
    display: 'flex',
    justifyContent: 'center!important',
    marginTop: '10px'
  },
  sideBarListItemEnd: {
    marginTop: 'auto!important',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  sideBarListItemLogout: {
    display: 'flex',
    justifyContent: 'center!important',
  }
}));