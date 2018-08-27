import {FETCH_VIEW_PROFILE} from '../Actions/actionType'

const initialState= {
    viewData: [], 
    phone: ''
}

export default function(state=initialState, action){
    switch(action.type){
        case FETCH_VIEW_PROFILE:
            return {
                ...state,
                viewData: action.view,
                phone: action.phone
            };
        default:
            return state
    }
}