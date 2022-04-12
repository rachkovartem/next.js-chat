import {Room} from "../../pages/profile/[id]";
import {ServerMessage} from "../../hooks/useNotification";
import {Socket} from "socket.io-client";

export interface InReq {
    id: string,
    userSenderId: string,
    userRecipientId: string,
    userRecipientStatus: boolean,
    sender: User,
}

export interface OutReq {
    id: string,
    userSenderId: string,
    userRecipientId: string,
    userRecipientStatus: boolean,
    recipient: User,
}

export interface FriendRoom extends User {
    roomId: string,
    groupRoom: boolean,
    lastMessage: ServerMessage,
    fullParticipants?: User[],
  }

export interface User {
    id: string,
    email: string,
    username: string,
    imagePath: string,
    friends: string[],
    objFriends: User[],
    groupRooms: string[],
    friendRequests: string[],
    fullGroupRooms: Room[],
    inReqs: InReq[],
    outReqs: OutReq[],
    friendsRoomsIds: {[key: string]: string},
    fullRooms: FriendRoom[] & Room [],
    password?: string
}

interface InitialState {
    user: User,
    fullRooms: FriendRoom[] | Room [],
    chatWindowLoading: boolean,
    currentRoom: Room | null,
    currentRoomId: string | null,
    error: string | null,
    useChatState: {
        usersOnline: string[],
    },
    socket: null | Socket,
}

export const initialState : InitialState = {
    user: {
       id: '',
       email: '',
       username: '',
       imagePath: '',
        groupRooms: [],
       friends: [],
       objFriends: [],
       friendRequests: [],
       fullGroupRooms: [],
       friendsRoomsIds: {},
       inReqs: [],
       outReqs: [],
       fullRooms:[],
   },
    fullRooms: [],
    chatWindowLoading: true,
    currentRoom: null,
    currentRoomId: null,
    error: null,
    useChatState: {
        usersOnline: [],
    },
    socket: null,
}

const reducer = (state = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            }
        case 'SET_FULL_ROOMS':
            return {
                ...state,
                fullRooms: [...action.payload],
            }
        case 'SET_CHAT_WINDOW_LOADING':
            return {
                ...state,
                chatWindowLoading: action.payload,
            }
        case 'UPDATE_FULL_ROOMS':
            const newFullRooms = [...state.fullRooms];
            const index = newFullRooms.findIndex(item => item.roomId === action.payload);
            if (index < 1) {
                return {
                    ...state,
                    fullRooms: newFullRooms,
                }
            } else {
                const deleted = newFullRooms.splice(index, 1);
                newFullRooms.unshift(deleted[0]);
                return {
                    ...state,
                    fullRooms: newFullRooms,
                }
            }
        case 'SET_CURRENT_ROOM':
            return {
                ...state,
                currentRoom: action.payload ? {...action.payload} : null,
            }

        case 'SET_CURRENT_ROOM_ID':
            return {
                ...state,
                currentRoomId: action.payload,
            }

        case 'SET_USER_OBJFRIENDS':
            return {
                ...state,
                user: {
                    ...state.user,
                    objFriends: action.payload,
                }
            }
        case 'SET_USER_INREQS':
            return {
                ...state,
                user: {
                    ...state.user,
                    inReqs: action.payload,
                }
            }
        case 'SET_USER_OUTREQS':
            return {
                ...state,
                user: {
                    ...state.user,
                    outReqs: action.payload,
                }
            }
        case 'SET_USER_IMAGE_PATH':
            return {
                ...state,
                user: {
                    ...state.user,
                    imagePath: action.payload,
                }
            }
        case `SET_REQUEST_ERROR`:
            return {
                ...state,
                error: action.payload,
            }
        case 'SET_USECHATSTATE_USERSONLINE':
            return {
                ...state,
                useChatState: {
                    ...state.useChatState,
                    usersOnline: action.payload,
                }
            }
        case 'SET_SOCKET':
            return {
                ...state,
                socket: action.payload,
            }
        default: return state
    }
}

export {reducer};
export type { InitialState };
