import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import * as React from "react";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {useDispatch, useSelector} from "react-redux";

import {setCurrentRoom} from "../../redux/actions";
import {sideBarStyles} from "./SideBar.styles";
import {onClickLogout} from "../../helpers/onClickLogout";
import {InitialState} from "../../redux/reducers";

export const SideBar = ({locale}: {locale: string}) => {
  const { socket } = useSelector((state: InitialState)  => state);
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const routerOptionLocale = locale === 'ru' ? 'en' : 'ru';
  const { t } = useTranslation('common');
  const classes = sideBarStyles();
  const dispatch = useDispatch();
  return <Box
    component="nav"
    className={classes.sideBarBox}
    aria-label="mailbox folders"
  >
    <Drawer
      variant="permanent"
      className={classes.sideBarDrawer}
      open
    >
      <List
      className={classes.sideBarList}
      >
        <ListItem
          button
          className={classes.sideBarListItem}
          onClick={() => router.push(`/profile/${localStorage.getItem('id')}`)}
        >
          <HomeTwoToneIcon fontSize={'large'} />
        </ListItem>
        <ListItem
          button
          className={classes.sideBarListItem}
          onClick={() => router.push(`/friends/${localStorage.getItem('id')}`)}
        >
          <PeopleAltTwoToneIcon fontSize={'large'} />
        </ListItem>
        <ListItem
          button
          className={classes.sideBarListItem}
          onClick={() => {
            router.push(`/room/${localStorage.getItem('id')}`)
            dispatch(setCurrentRoom(null))
          }}
        >
          <ForumTwoToneIcon  fontSize={'large'} />
        </ListItem>
        <ListItem
          onClick={() => router.push({ pathname, query }, asPath, { locale: routerOptionLocale })}
          button
          className={classes.sideBarListItemEnd}
        >
          <LanguageIcon/>
          <div>
            {routerOptionLocale.toUpperCase()}
          </div>
        </ListItem>
        <ListItem
          button
          className={classes.sideBarListItemLogout}
          onClick={() => onClickLogout({router, socket})}
        >
          <LogoutIcon />
        </ListItem>
      </List>
    </Drawer>
  </Box>
}