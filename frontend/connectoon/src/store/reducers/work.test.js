import React from 'react';

import reducer from './work';
import * as actionTypes from '../actions/actionTypes';

const stubWork = { id: 1 };
const stubMainWorks = [
  {
    title: 'Test Works',
    works: [
      JSON.stringify(stubWork),
    ],
  },
];

describe('Work Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({
      mainWorkLists: [],
      searchWord: '',
      selectedWorks: [],
      searchedWorks: [[], []],
      selectedWork: null,
      recWorkLists: [[]],
      works: [],
    });
  });

  it('should return main works', () => {
    const stubInitialState = {
      mainWorkLists: [stubWork],
    };
    const newState = reducer(stubInitialState, { type: actionTypes.GET_MAIN_WORKS, mainWorkLists: stubMainWorks });
    expect(newState.mainWorkLists).toEqual(stubMainWorks);
  });

  it('should get work', () => {
    const stubInitialState = {
      selectedWork: null,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_WORK,
      selectedWork: stubWork,
    });
    expect(newState).toEqual({
      selectedWork: stubWork,
    });
  });

  it('should get recommended works', () => {
    const stubInitialState = {
      recWorkLists: [[]],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_REC_WORKS,
      selectedWorks: [[stubWork]],
    });
    expect(newState).toEqual({
      recWorkLists: [[stubWork]],
    });
  });

  it('should get searched works', () => {
    const stubInitialState = {
      searchedWorks: [[], []],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_SEARCH_WORKS,
      selectedWorks: [[stubWork], [stubWork, stubWork]],
    });
    expect(newState).toEqual({
      searchedWorks: [[stubWork], [stubWork, stubWork]],
    });
  });

  it('should put search keyword', () => {
    const stubInitialState = {
      searchWord: '',
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.PUT_SEARCH_WORD,
      searchWord: 'test',
    });
    expect(newState).toEqual({
      searchWord: 'test',
    });
  });
});
