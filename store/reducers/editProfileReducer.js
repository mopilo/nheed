import {FETCH_EDIT_PROFILE, ADD_PHOTO} from '../Actions/actionType'

const initialState= {
    editData: [], 
    image: '',
    dp: ''
}

export default function(state=initialState, action){
    switch(action.type){
        case FETCH_EDIT_PROFILE:
            return {
                ...state,
                editData: action.edit
            };
        case ADD_PHOTO:
            return {
                ...state,
                image: action.pic,
                dp: action.dp
            }
        default:
            return state
    }
}