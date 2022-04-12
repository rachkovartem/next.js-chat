import {useEffect, useState} from "react";
import ApiServices from "../../services/ApiServices";
import {useRouter} from "next/router";
import {Button, TextField} from "@mui/material";
import {useTranslation} from "next-i18next";
import {ChangeLocal} from "../changeLocal/ChangeLocal";
import {useSnackbar} from "notistack";
import LoadingButton from '@mui/lab/LoadingButton';
import {LoginStyle} from "./Login.style";

const Login = ({locale} : {locale: string}) => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const [loginError, setLoginError] = useState(false)
    const [error, setError] = useState(false);
    const [valid, setValid] = useState(false);
    const [email, setEmail] = useState('');
    const [logging, setLogging] = useState(false);
    const [registration, setRegistration] = useState(false);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [onRegistration, setOnRegistration] = useState(false);
    const { login, register, check } = ApiServices();
    const classes = LoginStyle();
    const { enqueueSnackbar } = useSnackbar();

    const onLoading = async () => {
        const res = await check();
        if (!res) {
          enqueueSnackbar(t('smthWrong'), {variant: 'warning'});
          return
        }
        if (res.status === 403) return
        if (res.status >= 200 && res.status < 300) {
            router.push(`/profile/${res.data.id}`);
        }
    }

    useEffect(() => {
        onLoading()
    }, [])

    const onInputEmail = (e: any) => {
        setLoginError(false);
        setError(false);
        setEmail(e.target.value);
        setValid(e.target.validity.valid);
    }

    const onInputPassword = (e: any) => {
        setLoginError(false);
        setError(false);
        setPassword(e.target.value);
        setValid(e.target.validity.valid);
    }

    const onInputUsername = (e: any) => {
      setUsername(e.target.value)
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
    }

    const onClickLogin = async () => {
      setLogging(true)
        if (!valid) {
            setError(true);
            setLogging(false)
            enqueueSnackbar(t('userDoesNotExist'));
            return
        }
        if (!password) {
            setLoginError(true);
            setError(true);
            setLogging(false)
            enqueueSnackbar(t('userDoesNotExist'));
            return
        }

        try {
          const res = await login(email, password);
          const resBody = res.data;
          if ('id' in resBody) {
            localStorage.setItem('email', resBody.email);
            localStorage.setItem('id', resBody.id);
            localStorage.setItem('username', resBody.username);
            setLoginError(false);
            router.push(`/profile/${resBody.id}`);
          } else {
            setLoginError(true);
            enqueueSnackbar(t('userDoesNotExist'));
            localStorage.clear();
          }
        }
        catch (err) {
          console.error(err)
          enqueueSnackbar(t('smthWrong'), {variant: 'warning'});
        }
        finally {
          setLogging(false)
        }
    }

    const onClickRegister = async (e: any) => {
        if (!onRegistration) {
          setOnRegistration(true)
          return
        }
        setRegistration(true)
        setLoginError(false);
        if (!password || !email || !username) {
          setError(true);
          enqueueSnackbar(t('userAlreadyExist'));
          setRegistration(false);
          return
        }
        try {
          const res = await register(email, password, username);
          if (res.status === 'successfully') {
            await onClickLogin();
            setEmail('');
            setPassword('');
            setUsername('');
          } else if (res.status === 'already exist') {
            setError(true)
            enqueueSnackbar(t('userAlreadyExist'));
          }
        }
        catch (err) {
          console.error(err)
          enqueueSnackbar(t('smthWrong'), {variant: 'warning'});
        }
        finally {
          setRegistration(false);
        }
    }

    const displayOnRegistration = onRegistration ? 'inline-flex' : 'none';

    return (
      <>
        <ChangeLocal locale={locale}/>
        <form
          onSubmit={onSubmit}
          className={classes.loginForm}
        >
          <div
            className={classes.inputsWrapper}
          >
            <TextField
              required
              id="outlined-required-email"
              label={t('email')}
              placeholder={t('email')}
              value={email}
              onInput={onInputEmail}
              type="email"
              error={error || loginError}
              data-testid="inputEmail"
            />
            <TextField
              sx={{display: displayOnRegistration}}
              required={onRegistration}
              id="outlined-required-username"
              label={t('username')}
              placeholder={t('username')}
              value={username}
              onInput={onInputUsername}
              type="text"
              error={error || loginError}
              data-testid="inputUsername"
            />
            <TextField
              required
              id="outlined-required-password"
              label={t('password')}
              placeholder={t('password')}
              value={password}
              onInput={onInputPassword}
              type="password"
              error={error || loginError}
              data-testid="inputPassword"
            />
          </div>
          <LoadingButton
            className={classes.loginButton}
            onClick={onClickLogin}
            variant="contained"
            data-testid="buttonLogin"
            loading={logging}
          >
              {t('login')}
          </LoadingButton>
          <span
            style={{color: '#5d5d5d', padding: '0 10px'}}
          >
              {t('or')}
          </span>
          <LoadingButton
            className={classes.registrationButton}
            onClick={onClickRegister}
            variant="contained"
            data-testid="buttonRegister"
            loading={registration}
          >
              {t('register')}
          </LoadingButton>
        </form>
      </>

    )
}

export default Login