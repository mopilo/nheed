import {login, register, otp} from '../Actions/actionType'

const initialState= {
    token: null,
    userId: null,
    email: null
}

export default function(state=initialState, action){
    switch(action.type){
        case login:
            return {
                ...state,
                token: action.token,
                userId: action.userId
            };
        case register:
            return{
                ...state,
                email: action.email
            };
        case otp:
        return{
            ...state,
            email: action.token,
            userId: action.userId
        };
        default:
            return state
    }
}