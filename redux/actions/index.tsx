import {Room} from "../../pages/profile/[id]";
import {FriendRoom} from "../reducers";
import {Socket} from "socket.io-client";
import {ServerMessage} from "../../hooks/useNotification";

export const setUser = (value: any) => {
    return {
        type: 'SET_USER',
        payload: value
    }
}

export const setFullRooms = (value: (FriendRoom | Room)[]) => {
    return {
        type: 'SET_FULL_ROOMS',
        payload: value
    }
}

export const updateFullRooms = (roomId: string) => {
    return {
        type: 'UPDATE_FULL_ROOMS',
        payload: roomId
    }
}

export const setChatWindowLoading = (value: boolean) => {
    return {
        type: 'SET_CHAT_WINDOW_LOADING',
        payload: value
    }
}

export const setUserObjFriends = (value: any) => {
    return {
        type: 'SET_USER_OBJFRIENDS',
        payload: value
    }
}

export const setCurrentRoom = (value: Room | null) => {
    return {
        type: 'SET_CURRENT_ROOM',
        payload: value
    }
}

export const setCurrentRoomId = (value: string | null) => {
    return {
        type: 'SET_CURRENT_ROOM_ID',
        payload: value
    }
}

export const setUserInReqs = (value: any) => {
    return {
        type: 'SET_USER_INREQS',
        payload: value
    }
}

export const setUserOutReqs = (value: any) => {
    return {
        type: 'SET_USER_OUTREQS',
        payload: value
    }
}

export const setUserImagePath = (value: string) => {
    return {
        type: 'SET_USER_IMAGE_PATH',
        payload: value
    }
}

export const setRequestError = (value: string | null) => {
    return {
        type: 'SET_REQUEST_ERROR',
        payload: value
    }
}

export const setUseChatSateUsersOnline = (users: string[]) => {
    return {
        type: 'SET_USECHATSTATE_USERSONLINE',
        payload: users
    }
}

export const setSocket = (value: Socket) => {
    return {
        type: 'SET_SOCKET',
        payload: value
    }
}


