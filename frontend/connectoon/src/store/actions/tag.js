import axios from 'axios';
import { push } from 'connected-react-router';
import * as actionTypes from './actionTypes';

export const getSearchTags_ = (tags) => {
  return {
    type: actionTypes.GET_SEARCH_TAGS,
    searchedTags: tags,
  };
};

export const getSearchTags = (keyword) => {
  return (dispatch) => {
    return axios.get('/tags/search?q=' + keyword)
      .then((res) => {
        dispatch(getSearchTags_(res.data));
      });
  };
};
