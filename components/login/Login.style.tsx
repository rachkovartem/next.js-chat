import {makeStyles} from "@material-ui/core/styles";

export const LoginStyle = makeStyles(theme => ({
  loginForm: {
    width: '30%',
    margin: '0 auto',
    [theme.breakpoints.down(900)]: {
      width: 270
    },
    [theme.breakpoints.down(600)]: {
      marginTop: 50
    },
  },
  inputsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    padding: '15px 0'
  },
  loginButton: {
    margin: '0 auto',
    background: 'rgba(168,237,234,0)', color: '#3b3b3b'
  },
  registrationButton: {
    margin: '0 auto',
    background: 'rgba(168,237,234,0)',
    color: '#3b3b3b'
  }
}));