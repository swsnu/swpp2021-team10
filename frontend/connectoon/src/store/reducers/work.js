import * as actionTypes from '../actions/actionTypes';

const initialState = {
  works: [
  ],
  mainWorkLists: [
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MAIN_WORKS:
      return { ...state, mainWorkLists: action.mainWorkLists };
    default:
      break;
  }
  return state;
};

export default reducer;
