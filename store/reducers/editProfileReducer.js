import {FETCH_EDIT_PROFILE} from '../Actions/actionType'

const initialState= {
    editData: [], 
}

export default function(state=initialState, action){
    switch(action.type){
        case FETCH_EDIT_PROFILE:
            return {
                ...state,
                editData: action.edit
            };
        default:
            return state
    }
}