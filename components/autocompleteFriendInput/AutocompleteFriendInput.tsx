import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import * as React from "react";
import {useEffect, useState} from "react";
import {useTranslation} from "next-i18next";
import {Avatar} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Paper from "@mui/material/Paper";
import {useDispatch} from "react-redux";
import ApiServices from "../../services/ApiServices";
import {setUserOutReqs} from "../../redux/actions";
import {autocompleteFriendInputStyle} from "./autocompleteFriendInput.style";

export const AutocompleteFriendInput = ({enqueueSnackbar, id}: {enqueueSnackbar: Function, id: string}) => {
  const dispatch = useDispatch();
  const classes = autocompleteFriendInputStyle();
  const { t } = useTranslation('common');
  const { findUser } = ApiServices();
  const [initialSearch, setInitialSearch] = useState(true)
  const [options, setOptions] = useState<any[]>([]);
  const [text, setText] = useState('');
  const { friendRequest } = ApiServices();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL;

  const onChange = (e: any) => {
    if (initialSearch) {
      setInitialSearch(false)
    }
    setText(e.target.value.toString())
  }

  const onChangeText = async () => {
    const res = await findUser(text, id);
    if (Array.isArray(res.data)) {
      setOptions(res.data)
    } else {
      setOptions([])
    }
  }

  useEffect(() => {
    if (text.length > 0) {
      onChangeText()
    } else {
      setOptions([])
    }
  }, [text])

  const onClickAddFriend = async (e: any, idUser: string, idFriend: string) => {
    e.stopPropagation()
    const res = await friendRequest(idUser, idFriend);
    if ('data' in res && typeof res.data === 'string') {
      enqueueSnackbar(t(res.data), {variant: 'warning'});
      return
    }
    if ('data' in res && 'outReqs' in res.data) {
      dispatch(setUserOutReqs(res.data.outReqs));
      enqueueSnackbar(t(res.data.text), {variant: 'warning'});
      return
    }
    if(!('data' in res)) {
      enqueueSnackbar(t('smthWrong'), {variant: 'warning'})
      return
    }
  }

  return (<Autocomplete
    size='small'
    id='friendNameInput'
    options={options}
    sx={{p: '2px 4px', display: 'flex', alignItems: 'center'}}
    noOptionsText={initialSearch ? t('write') : t('notFound')}
    getOptionLabel={(option) => [option.username, option.email].toString()}
    renderOption={(props, option) => {
      return (<Paper
        className={classes.userPaperNoCursor}
        key={option.id}
        elevation={0}
      >
        <Avatar sx={{marginLeft: '6px', width: 26, height: 26}} alt="Avatar"
                src={option.imagePath}/>
        <div style={{marginLeft: '12px'}}>{option.username}</div>
        <PersonAddIcon
          sx={{
            marginLeft: 'auto',
            marginRight: '10px',
            width: '18px',
            cursor: 'pointer'
          }}
          onClick={e => onClickAddFriend(e, id, option.id)}
        />
      </Paper>)
    }}
    renderInput={(params) =>
      <>
        <TextField
          {...params}
          variant="standard"
          sx={{padding: '5px'}}
          // label={t('autocompleteLabel')}
          value={text}
          onBlur={() => setInitialSearch(true)}
          onChange={onChange}
        />
      </>
      }
  />)
}