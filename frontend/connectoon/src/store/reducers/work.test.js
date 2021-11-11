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
const stubReview = { id: 1 };

describe('Work Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({
      mainWorkLists: [],
      selectedWorks: [],
      searchedWorks: [[], []],
      selectedWork: null,
      selectedReviews: [],
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
      selectedWorks: [stubWork],
      searchedWorks: [[stubWork], [stubWork]],
      selectedWork: stubWork,
      selectedReviews: [stubReview],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_WORK,
      selectedWork: stubWork,
    });
    expect(newState).toEqual({
      selectedWorks: [stubWork],
      searchedWorks: [[stubWork], [stubWork]],
      selectedWork: stubWork,
      selectedReviews: [stubReview],
    });
  });

  it('should get work reviews', () => {
    const stubInitialState = {
      selectedWorks: [stubWork],
      searchedWorks: [[stubWork], [stubWork]],
      selectedWork: stubWork,
      selectedReviews: [stubReview],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_WORK_REVIEWS,
      selectedReviews: [stubReview],
    });
    expect(newState).toEqual({
      selectedWorks: [stubWork],
      searchedWorks: [[stubWork], [stubWork]],
      selectedWork: stubWork,
      selectedReviews: [stubReview],
    });
  });

  it('should get recommended works', () => {
    const stubInitialState = {
      selectedWorks: [stubWork],
      searchedWorks: [[stubWork], [stubWork]],
      selectedWork: stubWork,
      selectedReviews: [stubReview],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_REC_WORKS,
      selectedWorks: [stubWork],
    });
    expect(newState).toEqual({
      selectedWorks: [stubWork],
      searchedWorks: [[stubWork], [stubWork]],
      selectedWork: stubWork,
      selectedReviews: [stubReview],
    });
  });

  it('should get searched works', () => {
    const stubInitialState = {
      selectedWorks: [stubWork],
      searchedWorks: [[stubWork], [stubWork]],
      selectedWork: stubWork,
      selectedReviews: [stubReview],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_SEARCH_WORKS,
      selectedWorks: [[stubWork], [stubWork]],
    });
    expect(newState).toEqual({
      selectedWorks: [stubWork],
      searchedWorks: [[stubWork], [stubWork]],
      selectedWork: stubWork,
      selectedReviews: [stubReview],
    });
  });
});
