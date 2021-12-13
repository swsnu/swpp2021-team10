import axios from 'axios';
import { push } from 'connected-react-router';
import * as actionTypes from './actionTypes';

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

export const getReviews_ = (reviews, start) => {
  return {
    type: actionTypes.GET_REVIEWS,
    start,
    reviews,
  };
};

export const getWorkReviews = (id) => {
  return (dispatch) => {
    return axios.get('/works/' + id + '/reviews/')
      .then((res) => {
        dispatch(getReviews_(res.data.reviews, true));
      });
  };
};

export const getBoardReviews = () => {
  return (dispatch) => {
    return axios.get('/reviews/board/')
      .then((res) => {
        dispatch(getReviews_(res.data.reviews, true));
      });
  };
};

export const getMyReviews = (requestReviews) => {
  return (dispatch) => {
    return axios.get('/users/me/reviews/', { params: { requestReviews } })
      .then((res) => {
        dispatch(getReviews_(res.data.reviews, requestReviews[0][0] === 0));
      });
  };
};

export const postLike_ = (review) => {
  return {
    type: actionTypes.POST_LIKE,
    likeTargetReview: review,
  };
};

export const postLike = (id) => {
  return (dispatch) => {
    return axios.post('/reviews/' + id + '/like/')
      .then((res) => {
        dispatch(postLike_(res.data));
      });
  };
};

export const postUnlike_ = (review) => {
  return {
    type: actionTypes.POST_UNLIKE,
    unlikeTargetReview: review,
  };
};

export const postUnlike = (id) => {
  return (dispatch) => {
    return axios.post('/reviews/' + id + '/unlike/')
      .then((res) => {
        dispatch(postUnlike_(res.data));
      });
  };
};
