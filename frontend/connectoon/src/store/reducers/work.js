import * as actionTypes from '../actions/actionTypes';

const initialState = {
  works: [
  ],
  mainWorkLists: [
  ],
  selectedWorks: [
  ],
  searchedWorks: [
    [], [],
  ],
  selectedWork: null,
  selectedReviews: [
  ],
  recWorkLists: [
    [],
  ],
  searchWord: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MAIN_WORKS:
      return { ...state, mainWorkLists: action.mainWorkLists };
    case actionTypes.GET_WORK:
      return { ...state, selectedWork: action.selectedWork };
    case actionTypes.GET_WORK_REVIEWS:
      return { ...state, selectedReviews: action.selectedReviews };
    case actionTypes.GET_REC_WORKS:
      return { ...state, recWorkLists: action.selectedWorks };
    case actionTypes.GET_SEARCH_WORKS:
      return { ...state, searchedWorks: action.selectedWorks };
    case actionTypes.PUT_SEARCH_WORD:
      return { ...state, searchWord: action.searchWord };
    default:
      break;
  }
  return state;
};

export default reducer;
