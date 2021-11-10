import * as actionTypes from '../actions/actionTypes';

const initialState = {
  tags: [
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SEARCH_TAGS:
      return { ...state, tags: action.searchedTags };
    default:
      break;
  }
  return state;
};

export default reducer;
