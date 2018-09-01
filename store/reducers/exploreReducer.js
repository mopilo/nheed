import {EXPLORED, LIST_POST} from '../Actions/actionType'

const initialState = {
    exploreData: [],
    listData: {}
}

export default function(state=initialState, action){
    switch(action.type){
        case EXPLORED:
            return {
                ...state,
                exploreData: action.explore
            };
        case LIST_POST:
            return {
                ...state,
                listData: action.list
            };
        default:
            return state
    }
}