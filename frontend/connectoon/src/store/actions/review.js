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
    return axios.get('/api/review/' + id)
      .then((res) => dispatch(getReview_(res.data)));
  };
};

export const editReview_ = (review) => {
  return {
    type: actionTypes.EDIT_REVIEW,
    targetReview: review,
  };
};

export const editReview = (review) => {
  return (dispatch) => {
    return axios.put('/api/review/' + review.id, review)
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
    return axios.delete('/api/review/' + id)
      .then((res) => dispatch(deleteReview_(id)));
  };
};
