import * as actionTypes from '../actions/actionTypes';

const initialState = {
  users: [
  ],
  selectedUser: null,
  loggedInUser: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOKEN:
      return state;
    case actionTypes.LOG_IN:
      return { ...state, loggedInUser: action.loggedInUser };
    case actionTypes.LOG_OUT:
      return { ...state, loggedInUser: null };
    case actionTypes.REGISTER:
      return { ...state, selectedUser: action.selectedUser };
    case actionTypes.GET_USER:
      return { ...state, selectedUser: action.selectedUser };
    case actionTypes.GET_MYUSER:
      return { ...state, loggedInUser: action.loggedInUser };
    case actionTypes.EDIT_MYUSER:
      return { ...state, loggedInUser: action.loggedInUser };
    default:
      break;
  }
  return state;
};

export default reducer;
