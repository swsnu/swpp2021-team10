import axios from 'axios';
import { push } from 'connected-react-router';
import * as actionTypes from './actionTypes';

export const getMainWorks_ = (mainWorkListDict) => {
  return { type: actionTypes.GET_MAIN_WORKS, mainWorkLists: mainWorkListDict.worklists };
};

export const getMainWorks = () => {
  return (dispatch) => {
    return axios.get('/api/works/main/')
      .then((res) => {
        dispatch(getMainWorks_(res.data));
      });
  };
};
