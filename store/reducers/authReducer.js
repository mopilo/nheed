import {login, register} from '../Actions/actionType'

const initialState= {
    items: [],
    error: false,
}

export default function(state=initialState, action){
    switch(action.type){
        case login:
            return {
                ...state,
                items: action.payload,
            };
        // case register:
        //     return{

        //     };
        default:
            return state
    }
}