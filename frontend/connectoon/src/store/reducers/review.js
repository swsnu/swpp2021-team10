import * as actionTypes from '../actions/actionTypes';

const initialState = {
  reviews: [
  ],
  selectedReview: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_REVIEW:
      return { ...state, selectedReview: action.selectedReview };
    case actionTypes.EDIT_REVIEW:
      const editedReviews = state.reviews.map((x) => {
        if (x.id === action.targetReview.id) {
          return action.targetReview;
        }
        return x;
      });
      return { ...state, reviews: editedReviews };
    case actionTypes.DELETE_REVIEW:
      const deletedReviews = state.reviews.filter((x) => {
        return x.id !== action.targetID;
      });
      return { ...state, reviews: deletedReviews };
    default:
      break;
  }
  return state;
};

export default reducer;
