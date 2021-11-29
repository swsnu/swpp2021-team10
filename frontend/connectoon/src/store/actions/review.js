import axios from 'axios';
import { push } from 'connected-react-router';
import * as actionTypes from './actionTypes';

export const getReview_ = (review) => {
  return {
    type: actionTypes.GET_REVIEW,
    selectedReview: review,
  };
};

export const getReview = (id) => {
  return (dispatch) => {
    return axios.get('/reviews/' + id + '/')
      .then((res) => dispatch(getReview_(res.data)));
  };
};

export const editReview_ = (review) => {
  return {
    type: actionTypes.EDIT_REVIEW,
    targetReview: review,
  };
};

export const editReview = (id, review) => {
  return (dispatch) => {
    return axios.put('/reviews/' + id + '/', review)
      .then((res) => dispatch(editReview_(res.data)));
  };
};

export const deleteReview_ = (id) => {
  return {
    type: actionTypes.DELETE_REVIEW,
    targetID: id,
  };
};

export const deleteReview = (id) => {
  return (dispatch) => {
    return axios.delete('/reviews/' + id + '/')
      .then((res) => dispatch(deleteReview_(id)));
  };
};

export const getBoardReviews_ = (boardReviewsDict) => {
  console.log(boardReviewsDict);
  return {
    type: actionTypes.GET_BOARD_REVIEWS,
    boardReviews: boardReviewsDict.reviews,
  };
};

export const getBoardReviews = () => {
  return (dispatch) => {
    return axios.get('/reviews/board/')
      .then((res) => {
        dispatch(getBoardReviews_(res.data));
      });
  };
};

export const putLike_ = (review) => {
  return {
    type: actionTypes.PUT_LIKE,
    likeTargetReview: review,
  };
};

export const putLike = (id) => {
  return (dispatch) => {
    return axios.post('/reviews/' + id + '/like/')
      .then((res) => {
        dispatch(putLike_(res.data));
      });
  };
};

export const unputLike_ = (review) => {
  return {
    type: actionTypes.PUT_UNLIKE,
    unlikeTargetID: review,
  };
};

export const unputLike = (id) => {
  return (dispatch) => {
    return axios.post('/reviews/' + id + '/unlike/')
      .then((res) => {
        dispatch(unputLike_(res.data));
      });
  };
};
