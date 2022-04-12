import React, {useState} from 'react';
import {Menu, MenuItem} from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ApiServices from "../../services/ApiServices";
import {useTranslation} from "next-i18next";
import {setUserObjFriends} from "../../redux/actions";
import {useDispatch} from "react-redux";

// @ts-ignore
const MenuComponent = ({user, id, menuAnchorEl, groupChatMembers, setGroupChatMembers, enqueueSnackbar, setMenuAnchorEl}) => {
  const dispatch = useDispatch();
  const open = Boolean(menuAnchorEl);
  const { removeFriend } = ApiServices();
  const { t } = useTranslation('common');

  const handleClickMenu = (e: any) => {
    if (e) {
      e.stopPropagation();
    }
    setMenuAnchorEl(null);
  };

  const onClickRemoveFriend = async (e: any, idUser: string, idFriend: string) => {
    handleClickMenu(e);
    const res = await removeFriend(idUser, idFriend);
    if ('data' in res && 'objFriends' in res.data) {
      enqueueSnackbar(t(res.data.text), {variant: 'warning'});
      dispatch(setUserObjFriends(res.data.objFriends));
    }
    if ('data' in res && typeof res.data.text === 'string') {
      enqueueSnackbar(t(res.data.text), {variant: 'warning'})
    }
    if ('data' in res && typeof res.data === 'string') {
      enqueueSnackbar(t(res.data), {variant: 'warning'})
      return
    }
  }

  const onClickAddToGroupChat = async (e: any, id: string, username: string) => {
    handleClickMenu(e);
    if (groupChatMembers.some((member: {id: string, username: string}) => member.id === id)) {
      enqueueSnackbar(t('userAlreadyAdded'), {variant: 'warning'})
      return
    }
    setGroupChatMembers((prevState: {id: string, username: string}[]) => [...prevState, {id, username}])
  }

  return (
    <Menu
      id={user.id}
      autoFocus={false}
      anchorEl={menuAnchorEl}
      open={open}
      onClose={handleClickMenu}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem
        key={`add-${user.id}`}
        onClick={(e) => onClickAddToGroupChat(e, user.id, user.username)}>
        <GroupAddIcon sx={{marginRight: '10px'}}/>
        {t('addToGroupChat')}
      </MenuItem>
      <MenuItem
        key={`remove-${user.id}`}
        onClick={(e) => onClickRemoveFriend(e, id, user.id)}>
        <PersonRemoveIcon sx={{marginRight: '10px'}}/>
        {t('removeFriend')}
      </MenuItem>
    </Menu>
  );
};

export default MenuComponent;