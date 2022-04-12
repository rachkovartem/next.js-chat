import {useState} from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import * as React from "react";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import ForumTwoToneIcon from "@mui/icons-material/ForumTwoTone";
import LogoutIcon from "@mui/icons-material/Logout";
import {sideBarStyles} from "./BottomNavigationMobile.styles";
import {useRouter} from "next/router";
import {setCurrentRoom} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {onClickLogout} from "../../helpers/onClickLogout";
import {InitialState} from "../../redux/reducers";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from '@mui/icons-material/Settings';

export const BottomNavigationMobile = ({locale}: {locale: string}) => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const [value, setValue] = useState(router.pathname);
  const classes = sideBarStyles();
  const dispatch = useDispatch();
  const { socket } = useSelector((state: InitialState)  => state);
  const [anchorEl, setAnchorEl] = useState(null)
  const routerOptionLocale = locale === 'ru' ? 'en' : 'ru';

  const handleClickOption = (event: any) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  }

  return (
    <Box className={classes.bottomNavigationBox}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          if (newValue === 'options') return
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          value={'/profile/[id]'}
          icon={<HomeTwoToneIcon fontSize={'large'} />}
          onClick={() => router.push(`/profile/${localStorage.getItem('id')}`)}
        />
        <BottomNavigationAction
          value={'/friends/[id]'}
          icon={<PeopleAltTwoToneIcon fontSize={'large'} />}
          onClick={() => router.push(`/friends/${localStorage.getItem('id')}`)}
        />
        <BottomNavigationAction
          value={'/room/[id]'}
          icon={<ForumTwoToneIcon  fontSize={'large'} />}
          onClick={() => {
            router.push(`/room/${localStorage.getItem('id')}`)
            dispatch(setCurrentRoom(null))
          }}
        />
        <BottomNavigationAction
          value={'options'}
          icon={<SettingsIcon />}
          onClick={handleClickOption}
        />
      </BottomNavigation>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'options-button',
        }}
        sx={{zIndex: 5001}}
      >
        <MenuItem
          onClick={() => {
            router.push({pathname, query}, asPath, {locale: routerOptionLocale})
          }}
        >
          <LanguageIcon/>
          <span
            style={{marginLeft: 5}}
          >
              {routerOptionLocale.toUpperCase()}
            </span>
        </MenuItem>
        <MenuItem
          onClick={() => onClickLogout({router, socket})}
        >
          <LogoutIcon /><span style={{marginLeft: 5}}>Logout</span>
        </MenuItem>
      </Menu>
    </Box>
  );
}