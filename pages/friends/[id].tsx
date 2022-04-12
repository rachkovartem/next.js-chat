import {AutocompleteFriendInput} from "../../components/autocompleteFriendInput/AutocompleteFriendInput";
import * as React from "react";
import {useTranslation} from "next-i18next";
import {useEffect, useState} from "react";
import { useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Paper from "@mui/material/Paper";
import {AppContext} from "next/app";

import ApiServices from "../../services/ApiServices";
import {InitialState} from "../../redux/reducers";
import {SideBar} from "../../components/sideBar/SideBar";
import {PagesServices} from "../../services/PagesServices";
import {setFullRooms, setSocket, setUser, setUserInReqs, setUserOutReqs, updateFullRooms} from "../../redux/actions";
import {FriendsTab} from "../../components/friendsTab/FriendsTab";
import {GroupsTab} from "../../components/groupsTab/GroupsTab";
import {InReqsTab} from "../../components/inReqsTab/InReqsTab";
import {OutReqsTab} from "../../components/outReqsTab/OutReqsTab";
import {useSocket} from "../../hooks/useSocket";
import {ServerMessage, useNotification} from "../../hooks/useNotification";
import {friendsStyles} from "../../styles/friends.styles";
import {RecentsTab} from "../../components/recentsTab/RecentsTab";
import {GroupChatInput} from "../../components/groupChatInput/GroupChatInput";
import {CircularProgress, useMediaQuery} from "@mui/material";
import {theme} from "../../styles/theme";
import {BottomNavigationMobile} from "../../components/bottomNavigationMobile/BottomNavigationMobile";

interface Context extends AppContext {
  locale: string,
  params: { id: string }
}

export default function Friends (props: {locale: string, id: string}) {
  const { createSocket, setOnlineListeners } = useSocket();
  const {locale, id} = props;
  const { t } = useTranslation('common');
  const { rejectFriendReq, createGroupRoom } = ApiServices();
  const classes = friendsStyles(theme);
  const [groupChatMembers, setGroupChatMembers] = useState<{username: string, id: string}[]>([]);
  const [userLoading, setUserLoading] = useState(true);
  const [fullRoomsLoading, setFullRoomsLoading] = useState(true);
  const loading = userLoading && fullRoomsLoading;
  const isBrowser = typeof window !== 'undefined';
  const router = useRouter();
  const { socket, user, useChatState, fullRooms } = useSelector((state: InitialState)  => state);
  const { objFriends, inReqs, outReqs } = user;
  const { usersOnline } = useChatState;
  const dispatch = useDispatch();
  const { showNotification } = useNotification();
  const { onLoadingPage } = PagesServices();
  const { enqueueSnackbar } = useSnackbar();
  const { getUserById, getRequests, getAllRoomsIds, check, getAllUserRooms, createRoom } = ApiServices();

  useEffect(() => {
    const res = onLoadingPage(getUserById, getRequests, getAllRoomsIds, check);
    res.then(res => {
      dispatch(setUser(res));
      setUserLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!user.id) return
    const resFullRooms = getAllUserRooms(user.id)
    resFullRooms.then(res => {
      dispatch(setFullRooms(res.data))
      setFullRoomsLoading(false);
    })
    if (!socket) {
      dispatch(setSocket(createSocket()));
    }
  }, [user.id])

  useEffect(() => {
    if (socket) {
      socket.on('messages:add', (serverMessage: ServerMessage[]) => {
        showNotification(serverMessage[0])
        dispatch(updateFullRooms(serverMessage[0].roomId))
      })
      setOnlineListeners({socket, usersOnline});
    }
    return () => {
      socket?.removeAllListeners();
    }
  }, [socket]);

  const onClickRejectReq = async (idUser: string, idFriend: string, idReq: string) => {
    const res = await rejectFriendReq(idUser, idFriend, idReq);
    dispatch(setUserInReqs(res.data.inReqs));
    dispatch(setUserOutReqs(res.data.outReqs));
  }

  const onClickCreateGroupChat = async (members: {username: string, id: string}[], idUser: string) => {
    const res = await createGroupRoom(members, idUser);
    if ('data' in res && typeof res.data === 'string') {
      enqueueSnackbar(t(res.data))
      return
    } else if ('data' in res) {
      await router.push(`/room/${res.data.roomRes.roomId}`);
    } else {
      console.log('err');
    }
  }

  const onClickUser = async (id1: string, id2: string) => {
    const res = await createRoom([id1, id2])
    if (res.status === 201) {
      await router.push(`/room/${res.data.roomId}`);
    }
  }

  const onClickRoom = async (roomId: string) => {
    await router.push(`/room/${roomId}`);
  }

  const friendsTabProps = {isBrowser, objFriends, id, groupChatMembers, setGroupChatMembers, enqueueSnackbar, onClickUser};

  const groupChatInput = groupChatMembers.length > 0
    ? <GroupChatInput
        groupChatMembers={groupChatMembers}
        onClickCreateGroupChat={onClickCreateGroupChat}
        setGroupChatMembers={setGroupChatMembers}
        user={user}
      />
    : null;

  return <div className={classes.friendsPage}>
    <SideBar locale={locale}/>
    <BottomNavigationMobile locale={locale}/>
    <div className={classes.friendsWrapper}>
      <div className={classes.groupsInputPaperWrapper}>
        <Paper
          className={classes.groupsInputPaper}
          sx={{borderRadius: '20px'}}
          elevation={3}
        >
          <AutocompleteFriendInput enqueueSnackbar={enqueueSnackbar} id={id}/>
        </Paper>
        <div className={classes.groupsPaperWrapper}>
          <Paper
            className={classes.groupsPaper}
            sx={loading ? {display: 'flex', flexDirection: 'column'} : null}
            elevation={3}
          >
            <h3>{t('groups')}</h3>
            {loading ? <CircularProgress sx={{margin: 'auto'}}/> : <GroupsTab onClickRoom={onClickRoom}/>}
          </Paper>
        </div>
      </div>
      <div className={classes.friendsPaperWrapper}>
        <Paper
          className={classes.friendPaper}
          sx={loading ? {display: 'flex', flexDirection: 'column'} : null}
          elevation={3}
        >
          <h3>{t('friends')}</h3>
          {groupChatInput}
          {loading ? <CircularProgress sx={{margin: 'auto'}}/> : <FriendsTab {...friendsTabProps} />}
        </Paper>
      </div>
      <div className={classes.recentsPaperWrapper}>
        <Paper
          className={classes.recentsPaper}
          sx={loading ? {display: 'flex', flexDirection: 'column'} : null}
          elevation={3}
        >
          <h3>{t('recents')}</h3>
          <div style={{display: loading ? 'flex' : 'block'}}>
            {
              loading
              ? <CircularProgress sx={{margin: 'auto'}}/>
              : <RecentsTab fullRooms={fullRooms} user={user} onClickRoom={onClickRoom} onClickUser={onClickUser} />
            }
          </div>
        </Paper>
      </div>
      <div className={classes.inReqsPaperWrapper}>
        <Paper
          className={classes.inReqsPaper}
          sx={loading ? {display: 'flex', flexDirection: 'column'} : null}
          elevation={3}
        >
          <h3>{t('inRequests')}</h3>
          {
            loading
            ? <CircularProgress sx={{margin: 'auto'}}/>
            : <InReqsTab
              enqueueSnackbar={enqueueSnackbar}
              inReqs={inReqs}
              id={id}
              onClickRejectReq={onClickRejectReq}
            />
          }
        </Paper>
      </div>
      <div className={classes.outReqsPaperWrapper}>
        <Paper
          className={classes.outReqsPaper}
          sx={loading ? {display: 'flex', flexDirection: 'column'} : null}
          elevation={3}
        >
          <h3>{t('outRequests')}</h3>
          {
            loading
              ? <CircularProgress sx={{margin: 'auto'}}/>
              : <OutReqsTab outReqs={outReqs} id={id} onClickRejectReq={onClickRejectReq} />
          }
        </Paper>
      </div>
    </div>
  </div>
}

export async function getServerSideProps(context: Context) {
  const { locale, params } = context;
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ['common'])),
      id: params.id
    },
  }
}