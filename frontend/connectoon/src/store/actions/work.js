import axios from 'axios';
import { push } from 'connected-react-router';
import * as actionTypes from './actionTypes';

export const getMainWorks_ = (mainWorkListDict) => {
  return {
    type: actionTypes.GET_MAIN_WORKS,
    mainWorkLists: mainWorkListDict.worklists,
  };
};

export const getMainWorks = () => {
  return (dispatch) => {
    return axios.get('/works/main/')
      .then((res) => {
        dispatch(getMainWorks_(res.data));
      });
  };
};

export const getWork_ = (work) => {
  return {
    type: actionTypes.GET_WORK,
    selectedWork: work,
  };
};

export const getWork = (id) => {
  return (dispatch) => {
    return axios.get('/works/' + id)
      .then((res) => {
        dispatch(getWork_(res.data));
      });
  };
};

export const getWorkReviews_ = (reviews) => {
  return {
    type: actionTypes.GET_WORK_REVIEWS,
    selectedReviews: reviews,
  };
};

export const getWorkReviews = (id) => {
  return (dispatch) => {
    return axios.get('/works/' + id + '/reviews/')
      .then((res) => {
        dispatch(getWorkReviews_(res.data));
      });
  };
};

export const getRecWorks_ = (works) => {
  return {
    type: actionTypes.GET_REC_WORKS,
    selectedWorks: works,
  };
};

export const getRecWorks = () => {
  return (dispatch) => {
    return axios.get('/works/recommend')
      .then((res) => {
        dispatch(getRecWorks_(res.data));
      });
  };
};

export const getSearchWorks_ = (works) => {
  return {
    type: actionTypes.GET_SEARCH_WORKS,
    selectedWorks: works,
  };
};

export const getSearchWorks = (keyword, keytag) => {
  return (dispatch) => {
    return axios.get('/works/search?q=' + keyword + '&tags=' + keytag)
      .then((res) => {
        dispatch(getSearchWorks_(res.data));
      });
  };
};
