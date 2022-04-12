import {makeStyles} from "@material-ui/core/styles";

export const sideBarStyles = makeStyles((theme)=> ({
  bottomNavigationBox: {
    width: '100%',
    height: 56,
    zIndex: 5000,
    [theme.breakpoints.down(550)]: {
      position: 'fixed',
      bottom: 0,
      left: 0
    },
    [theme.breakpoints.up(1000)]: {
      display: 'none'
    },
  },
}));