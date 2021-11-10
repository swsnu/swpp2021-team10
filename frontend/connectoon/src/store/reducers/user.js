import * as actionTypes from '../actions/actionTypes';

const initialState = {
  users: [
  ],
  selectedUser: null,
  myreviews: [
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOG_IN:
      return { ...state, selectedUser: action.selectedUser };
    case actionTypes.REGISTER:
      return { ...state, selectedUser: action.selectedUser };
    case actionTypes.GET_USER:
      return { ...state, selectedUser: action.selectedUser };
    case actionTypes.GET_MYUSER:
      return { ...state, selectedUser: action.selectedUser };
    case actionTypes.EDIT_MYUSER:
      return { ...state, selectedUser: action.selectedUser };
    case actionTypes.GET_MYREVIEWS:
      return { ...state, myreviews: action.myreviews };
    default:
      break;
  }
  return state;
};

export default reducer;
