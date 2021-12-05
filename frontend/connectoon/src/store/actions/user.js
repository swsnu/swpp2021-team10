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

export const logOut_ = () => {
  return {
    type: actionTypes.LOG_OUT,
  };
};

export const logOut = () => {
  return (dispatch) => {
    return axios.get('/users/logout/')
      .then((res) => {
        dispatch(logOut_());
      });
  };
};

export const register_ = (user) => {
  return {
    type: actionTypes.REGISTER,
    selectedUser: user,
  };
};

export const register = (registerData) => {
  return (dispatch) => {
    const {
      email, username, password, image, tags,
    } = registerData;

    const form = new FormData();
    form.append('email', email);
    form.append('username', username);
    form.append('password', password);
    form.append('profile_picture', image);
    if (tags) {
      tags.forEach((tag) => {
        form.append('tags', tag);
      });
    }

    return axios.post('/users/', form)
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

export const editMyUser_ = () => {
  return {
    type: actionTypes.EDIT_MYUSER,
  };
};

export const editMyUser = (userData) => {
  return (dispatch) => {
    const {
      username, password, image, tags,
    } = userData;

    const form = new FormData();
    form.append('username', username);
    form.append('password', password);
    if (image) form.append('profile_picture', image);
    if (tags) {
      tags.forEach((tag) => {
        form.append('tags', tag);
      });
    }

    return axios.put('/users/me/', form)
      .then((res) => {
        dispatch(editMyUser_());
        dispatch(push('/main'));
      });
  };
};

export const dupCheckEmail = (email) => {
  return () => {
    return axios.post('/users/dup/email/', email);
  };
};

export const dupCheckUsername = (username) => {
  return () => {
    return axios.post('/users/dup/username/', username);
  };
};
