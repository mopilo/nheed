import { HOME_SUCCESS, PROFILE, MY_PROFILE, GRID_POST } from "../Actions/actionType";

const initialState = {
  data: [],
  profileData: [],
  pic: '',
  idData: '',
  user: '',
  phone: ''
  // error: undefined
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HOME_SUCCESS:
      return {
        ...state,
        data: action.data
      };
    case PROFILE:
      return {
        ...state,
        profileData: action.profile,
        pic: action.pic
      };
    case MY_PROFILE:
      return {
        ...state,
        idData: action.user,
        phone: action.phone
      };
    case GRID_POST:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};

export default reducer;