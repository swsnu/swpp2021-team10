import axios from 'axios';
import { push } from 'connected-react-router';
import * as actionTypes from './actionTypes';

export const getMainWorks_ = (mainWorkListDict) => {
  return {
    type: actionTypes.GET_MAIN_WORKS,
    mainWorkLists: mainWorkListDict.worklists,
  };
};

export const getMainWorks = (requestWorks) => {
  return (dispatch) => {
    return axios.get('/works/main/', { params: { requestWorks } })
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

export const noSuchWork_ = () => {
  return {
    type: actionTypes.WORK_NOT_EXISTING,
  };
};

export const getWork = (id) => {
  return (dispatch) => {
    return axios.get('/works/' + id)
      .then((res) => {
        dispatch(getWork_(res.data));
      })
      .catch((rej) => {
        if (rej.response.status === 404) {
          dispatch(noSuchWork_());
        }
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

export const postWorkReview = (id, reviewData) => {
  return (dispatch) => {
    return axios.post('/works/' + String(id) + '/reviews/', reviewData)
      .then((res) => { });
  };
};
