import '../styles/globals.css'
import type { AppProps } from 'next/app';
import {Provider} from 'react-redux';
import store from "../redux/store/store";
import { appWithTranslation } from 'next-i18next';
import {SnackbarProvider} from "notistack";
import {useEffect, useState} from "react";
import {makeStyles} from "@mui/styles";

function SafeHydrate({ children }: any) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  const useStyles = makeStyles((theme) => ({
    snackbar: {
      zIndex: '6000 !important',
    }
  }));
  const classes = useStyles();
  return (
    <SnackbarProvider
      maxSnack={3}
      preventDuplicate
      classes={{containerRoot: classes.snackbar}}
    >
      <Provider store={store}>
        <SafeHydrate>
            <Component {...pageProps} />
        </SafeHydrate>
      </Provider>
    </SnackbarProvider>
      )
}

export default appWithTranslation(MyApp);
