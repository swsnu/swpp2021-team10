import * as actionTypes from '../actions/actionTypes';

const initialState = {
  reviews: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_REVIEWS:
      return { ...state, reviews: action.reviews };
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
    case actionTypes.POST_LIKE:
      const likeReviews = state.reviews.map((x) => {
        if (x.id === action.likeTargetReview.id) {
          return action.likeTargetReview;
        }
        return x;
      });
      return { ...state, reviews: likeReviews };
    case actionTypes.POST_UNLIKE:
      const unlikeReviews = state.reviews.map((x) => {
        if (x.id === action.unlikeTargetReview.id) {
          return action.unlikeTargetReview;
        }
        return x;
      });
      return { ...state, reviews: unlikeReviews };
    default:
      break;
  }
  return state;
};

export default reducer;
