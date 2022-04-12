
import {useApi} from "../hooks/useApi";

const ApiServices = () => {
  const { getRequest, postRequest } = useApi();

  const login = async (email: string, password: string) => {
    const res = await postRequest(`/auth/login`, {email, password});
    if ('data' in res && 'access_token' in res.data) {
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);
    }
    return res
  }

  const register = async (email: string, password: string, username: string) => {
    const res = await postRequest(`/register`,{email, password, username});
    return res.data;
  }

  const check = async () => await getRequest('/check');

  const getUserById = async (id: string) =>
    await getRequest('/getUserById',  {id});

  const findUser = async (option: string, id: string) =>
    await getRequest('/findUser', {option, id});

  const removeFriend = async (idUser: string, idFriend: string) =>
    await postRequest('/removeFriend', {idUser, idFriend});

  const getAllUserRooms = async (userId: string) =>
    await postRequest('/rooms/getAllUserRooms', {userId});

  const getAllUsers = async () => await getRequest('/allUsers');

  const createRoom = async (participants: string[]) =>
    await postRequest('/rooms/createRoom', { participants });

  const friendRequest = async (idUser: string, idFriend: string) =>
    await postRequest('/friendRequest', { idUser, idFriend })

  const createGroupRoom = async (members: {username: string, id: string}[], idUser: string) =>
    await postRequest('/rooms/createGroupRoom', { members, idUser });

  const getRoomInfo = async (id: string) => await postRequest('/rooms/getRoomInfo',{ id });

  const getAllRoomsIds = async (idUser: string) => await postRequest('/rooms/getAllRoomsIds',{ idUser });

  const uploadImage = async (file: any, id: string) => {
    let data = new FormData();
    data.append('file', file);
    data.append('id', id);
    return await postRequest('/uploadImage', data, { headers: { 'Content-Type': 'multipart/form-data' }})
  }

  const getRequests = async (friendReqsArr: string[], userId: string) =>
    await postRequest('/getRequests', { friendReqsArr, userId });

  const approveFriendReq = async (idUser: string, idFriend: string, idReq: string) =>
    await postRequest('/approveFriendReq', { idUser, idFriend, idReq });

  const rejectFriendReq = async (idUser: string, idFriend: string, idReq: string) =>
    await postRequest('/rejectFriendReq', { idUser, idFriend, idReq });

  return {
    login,
    register,
    check,
    getUserById,
    getAllUsers,
    createRoom,
    uploadImage,
    friendRequest,
    getRequests,
    approveFriendReq,
    rejectFriendReq,
    findUser,
    removeFriend,
    createGroupRoom,
    getRoomInfo,
    getAllRoomsIds,
    getAllUserRooms,
    getRequest
  }
}

export default ApiServices;