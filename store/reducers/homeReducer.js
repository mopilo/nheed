import { HOME_SUCCESS, ERROR } from "../Actions/actionType";

const initialState = {
  data: [],
  // error: undefined
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HOME_SUCCESS:
      return {
        ...state,
        data: action.data
      };
    // case ERROR:
    //   return {
    //     ...state,
    //     error: action.error
    //   };
    default:
      return state;
  }
};

export default reducer;