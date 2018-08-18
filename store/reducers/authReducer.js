import {login, register} from '../Actions/actionType'

const initialState= {
    token: null,
    userId: null,
}

export default function(state=initialState, action){
    switch(action.type){
        case login:
            return {
                ...state,
                token: action.token,
                userId: action.userId
            };
        // case register:
        //     return{

        //     };
        default:
            return state
    }
}