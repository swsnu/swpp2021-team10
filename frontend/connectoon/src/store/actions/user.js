import axios from 'axios';
import { push } from 'connected-react-router';
import * as actionTypes from './actionTypes';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const token_ = () => {
  return {
    type: actionTypes.TOKEN,
  };
};

export const token = () => {
  return (dispatch) => {
    return axios.get('/token/')
      .then((res) => {
        dispatch(token_());
      });
  };
};

export const logIn_ = (user) => {
  return {
    type: actionTypes.LOG_IN,
    loggedInUser: user,
  };
};

export const logIn = (loginData) => {
  return (dispatch) => {
    return axios.post('/users/login/', loginData)
      .then((res) => {
        dispatch(logIn_(res.data));
      });
  };
};

export const logOut = () => {
  return { type: actionTypes.LOG_OUT };
};

export const register_ = (user) => {
  return {
    type: actionTypes.REGISTER,
    selectedUser: user,
  };
};

export const register = (user) => {
  return (dispatch) => {
    return axios.post('/users/', user)
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
    return axios.get('/users/' + id)
      .then((res) => {
        dispatch(getUser_(res.data));
      });
  };
};

export const getMyUser_ = (user) => {
  return {
    type: actionTypes.GET_MYUSER,
    loggedInUser: user,
  };
};

export const getMyUser = () => {
  return (dispatch) => {
    return axios.get('/users/me/')
      .then((res) => {
        dispatch(getMyUser_(res.data));
      });
  };
};

export const editMyUser_ = (user) => {
  return {
    type: actionTypes.EDIT_MYUSER,
    loggedInUser: user,
  };
};

export const editMyUser = (user) => {
  return (dispatch) => {
    return axios.put('/users/me/', user)
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
    return axios.get('/users/me/reviews/')
      .then((res) => {
        dispatch(getMyReviews_(res.data));
      });
  };
};
