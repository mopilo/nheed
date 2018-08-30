import {EXPLORED} from '../Actions/actionType'

const initialState = {
    exploreData: []
}

export default function(state=initialState, action){
    switch(action.type){
        case EXPLORED:
            return {
                ...state,
                exploreData: action.explore
            }
        default:
            return state
    }
}