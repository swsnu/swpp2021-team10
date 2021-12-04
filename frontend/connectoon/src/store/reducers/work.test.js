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
      selectedWorks: [],
      searchedWorks: [[], []],
      selectedWork: null,
      noSuchSelectedWork: false,
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
      noSuchSelectedWork: false,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_WORK,
      selectedWork: stubWork,
    });
    expect(newState).toEqual({
      selectedWork: stubWork,
      noSuchSelectedWork: false,
    });
  });

  it('should notify if there is no such work', () => {
    const stubInitialState = {
      noSuchSelectedWork: false,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.WORK_NOT_EXISTING,
    });
    expect(newState).toEqual({
      selectedWork: null,
      noSuchSelectedWork: true,
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
});
