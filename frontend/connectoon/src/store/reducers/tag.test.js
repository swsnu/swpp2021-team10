import React from 'react';

import reducer from './tag';
import * as actionTypes from '../actions/actionTypes';

const stubTag = { id: 1 };

describe('Tag Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({ tags: [] });
  });

  it('should search tags', () => {
    const stubInitialState = {
      tags: [stubTag],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_SEARCH_TAGS,
      searchedTags: [stubTag],
    });
    expect(newState).toEqual({
      tags: [stubTag],
    });
  });
});
