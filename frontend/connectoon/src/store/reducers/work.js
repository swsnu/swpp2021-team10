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
  recWorkLists: [
    [],
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MAIN_WORKS:
      return { ...state, mainWorkLists: action.mainWorkLists };
    case actionTypes.GET_WORK:
      return { ...state, selectedWork: action.selectedWork };
    case actionTypes.GET_REC_WORKS:
      return { ...state, recWorkLists: action.selectedWorks };
    case actionTypes.GET_SEARCH_WORKS:
      return { ...state, searchedWorks: action.selectedWorks };
    default:
      break;
  }
  return state;
};

export default reducer;
