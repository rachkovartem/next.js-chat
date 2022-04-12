import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import * as React from 'react';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import {useMediaQuery} from "@mui/material";

import {ChatWindow} from "../../components/chatWindow/ChatWindow";
import {SideBar} from "../../components/sideBar/SideBar";
import {InitialState} from "../../redux/reducers";
import {PagesServices} from "../../services/PagesServices";
import ApiServices from "../../services/ApiServices";
import {ChatFriendList} from "../../components/chatFriendsList/ChatFriendsList";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import {
  setChatWindowLoading,
  setCurrentRoomId,
  setSocket, setUser,
} from "../../redux/actions";
import {setCurrentRoom} from "../../redux/actions";
import {useSocket} from "../../hooks/useSocket";
import {roomStyles} from "../../styles/room.styles";
import {BottomNavigationMobile} from "../../components/bottomNavigationMobile/BottomNavigationMobile";
import { ErrorBoundary } from "../../components/errorBoundary/ErrorBoundary";


export default function Room(props: any) {
  const mobile = useMediaQuery('(max-width:900px)');
  const classes = roomStyles();
  const { locale, id } = props;
  const {
    getRoomInfo,
    getUserById,
    getRequests,
    getAllRoomsIds,
    check,
  } = ApiServices();

  const { createSocket, setOnlineListeners } = useSocket();
  const { t } = useTranslation('common');
  const { onLoadingPage, pageLoading } = PagesServices();
  const dispatch = useDispatch();
  const { user, socket, currentRoom, useChatState, chatWindowLoading } = useSelector((state: InitialState)  => state);
  const { usersOnline } = useChatState;
  const [drawerOpen, setDrawerOpen] = useState(user?.id === id);
  const [initialRender, setInitialRender] = useState(true);

  const loadRoom = async (id: string) => {
    dispatch(setCurrentRoomId(id));
    let room = await getRoomInfo(id);
    if (!('data' in room)) {
      room.data = null
    }
    dispatch(setCurrentRoom(room.data));
    dispatch(setChatWindowLoading(false));
  }

  useEffect(() => {
    const res = onLoadingPage(getUserById, getRequests, getAllRoomsIds, check);
    res.then(res => {
      if (!res) return
      dispatch(setUser(res))
      const socket = createSocket();
      dispatch(setSocket(socket));
      if (initialRender) {
        loadRoom(id)
        setInitialRender(false);
      }
    })
    return () => {
      if (socket) socket.removeAllListeners();
      dispatch(setCurrentRoomId(null));
      dispatch(setCurrentRoom(null));
    };
  }, [])

  useEffect(() => {
    if (socket) {
      setOnlineListeners({socket, usersOnline})
    }
  }, [socket])

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Успешная регистрация
        console.log('ServiceWorker registration successful with scope:', registration.scope);
      }, function(err) {
        // При регистрации произошла ошибка
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

  function requestPermission() {
    return new Promise(function(resolve, reject) {
      const permissionResult = Notification.requestPermission(function(result) {
        // Поддержка устаревшей версии с функцией обратного вызова.
        resolve(result);
      });

      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    })
      .then(function(permissionResult) {
        if (permissionResult !== 'granted') {
          throw new Error('Permission not granted.');
        }
      });
  }

  function subscribeUserToPush() {
    return navigator.serviceWorker.register('../sw.js')
      .then(function(registration) {
        const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_SERVICE_WORKER_PUBLIC_KEY || process.env.SERVICE_WORKER_PUBLIC_KEY
        };
        return registration.pushManager.subscribe(subscribeOptions);
      })
      .then(function(pushSubscription) {
        return JSON.stringify(pushSubscription);
      });
  }

  useEffect(() => {
    handleSW();
  }, []);

  const handleSW =  async () => {
    await requestPermission()
    subscribeUserToPush()
      .then(res => console.log(res))
      .catch(err => console.error(`Произошла ошибка: ${err}`))
  }

  const chatSpinner = chatWindowLoading ? <CircularProgress sx={{ margin: 'auto' }} /> : null;
  const chatView = currentRoom && socket && !chatWindowLoading ? <ChatWindow room={currentRoom} setDrawerOpen={setDrawerOpen} /> : null;
  const noFriends = !currentRoom && socket && !chatWindowLoading && user.friends.length === 0
    ? <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%'
      }}
    >
      <div style={{
        margin: 'auto',
        padding: '20px'
      }}>
        {mobile ? <div>{t('noFriends')}</div> : <div style={{width: '100%'}}>{t('noFriends')}</div>}
      </div>
    </div>
    : null;
  const placeHolder = !currentRoom && socket && !chatWindowLoading && user.friends.length > 0
    ? <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%'
      }}
      >
        <div style={{
          margin: 'auto',
          padding: '20px'
        }}>
          {mobile ? <div>{t('swipeText')}</div> : null}
          <div>{t('unselectedChatText')}</div>
        </div>
      </div>
    : null;

  const chatFriendListElement = mobile
    ? <SwipeableDrawer
      swipeAreaWidth={100}
      SwipeAreaProps={{sx: {zIndex: 0}}}
      className={classes.roomDrawer}
      anchor='left'
      open={drawerOpen}
      disableSwipeToOpen={false}
      onClose={() => setDrawerOpen(false)}
      onOpen={() => setDrawerOpen(true)}
    >
      <ChatFriendList setDrawerOpen={setDrawerOpen}/>
    </SwipeableDrawer>
    : <Box className={classes.roomBox}>
      <ChatFriendList />
    </Box>

  return (
    <div className={classes.roomPage}>
      <ErrorBoundary>
        <SideBar locale={locale}/>
      </ErrorBoundary>
      <ErrorBoundary>
        <BottomNavigationMobile locale={locale}/>
      </ErrorBoundary>
      <ErrorBoundary>
        {
          pageLoading
            ? <CircularProgress sx={{position: 'absolute', top: '45%', left: '45%'}} />
            : <div className={classes.roomBoxWrapper}>
                {user.friends.length > 0 ? chatFriendListElement : null}
              <div
                className={classes.chatViewWrapper}
              >
                {chatSpinner}
                {chatView}
                {placeHolder}
                {noFriends}
              </div>
            </div>
        }
      </ErrorBoundary>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const { locale } = context;

  return {
    props: {
      id,
      locale,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}