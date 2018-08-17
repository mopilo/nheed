import { CHANGE_CONNECTION_STATUS } from "../Actions/actionType";

const initialState = {
  isConnected: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CONNECTION_STATUS:
        return Object.assign({}, state, {
            isConnected: action.isConnected,
        });
      
    default:
      return state;
  }
};

export default reducer;