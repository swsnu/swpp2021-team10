import axios from 'axios';
import { push } from 'connected-react-router';
import * as actionTypes from './actionTypes';

export const logIn_ = (user) => {
  return {
    type: actionTypes.LOG_IN,
    selectedUser: user,
  };
};

export const logIn = (user) => {
  return (dispatch) => {
    return axios.post('/api/users/login', user)
      .then((res) => {
        dispatch(logIn_(res.data));
        dispatch(push('/'));
      });
  };
};

export const register_ = (user) => {
  return {
    type: actionTypes.REGISTER,
    selectedUser: user,
  };
};

export const register = (user) => {
  return (dispatch) => {
    return axios.post('/api/users/', user)
      .then((res) => {
        dispatch(register_(res.data));
        dispatch(push('/login'));
      });
  };
};

export const getUser_ = (user) => {
  return {
    type: actionTypes.GET_USER,
    selectedUser: user,
  };
};

export const getUser = (id) => {
  return (dispatch) => {
    return axios.get('/api/users/' + id)
      .then((res) => {
        dispatch(getUser_(res.data));
      });
  };
};

export const getMyUser_ = (user) => {
  return {
    type: actionTypes.GET_MYUSER,
    selectedUser: user,
  };
};

export const getMyUser = () => {
  return (dispatch) => {
    return axios.get('/api/users/me/')
      .then((res) => {
        dispatch(getMyUser_(res.data));
      });
  };
};

export const editMyUser_ = (user) => {
  return {
    type: actionTypes.EDIT_MYUSER,
    selectedUser: user,
  };
};

export const editMyUser = (user) => {
  return (dispatch) => {
    return axios.put('/api/users/me/', user)
      .then((res) => {
        dispatch(editMyUser_(res.data));
      });
  };
};

export const getMyReviews_ = (reviews) => {
  return {
    type: actionTypes.GET_MYREVIEWS,
    myreviews: reviews,
  };
};

export const getMyReviews = () => {
  return (dispatch) => {
    return axios.get('/api/users/me/reviews/')
      .then((res) => {
        dispatch(getMyReviews_(res.data));
      });
  };
};
