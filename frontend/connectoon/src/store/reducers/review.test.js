import React from 'react';

import reducer from './review';
import * as actionTypes from '../actions/actionTypes';

const stubReview = { id: 1, title: 'test', content: 'test' };

describe('Review Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({
      reviews: [],
      selectedReview: null,
      boardReviews: [],
    });
  });

  it('should edit review', () => {
    const stubReview2 = { id: 2, title: 'test', content: 'test' };
    const stubInitialState = {
      reviews: [stubReview, stubReview2],
      selectedReview: null,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.EDIT_REVIEW,
      targetReview: stubReview,
      targetID: stubReview.id,
    });
    expect(newState).toEqual({
      reviews: [stubReview, stubReview2],
      selectedReview: null,
    });
  });

  it('should delete review', () => {
    const stubInitialState = {
      reviews: [stubReview],
      selectedReview: null,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.DELETE_REVIEW,
      targetID: stubReview.id,
    });
    expect(newState).toEqual({
      reviews: [],
      selectedReview: null,
    });
  });

  it('should get review', () => {
    const stubSelectedReview = { id: 1, title: 'title', content: 'content' };
    const newState = reducer(undefined, {
      type: actionTypes.GET_REVIEW,
      selectedReview: stubSelectedReview,
    });
    expect(newState).toEqual({
      reviews: [],
      selectedReview: stubSelectedReview,
      boardReviews: [],
    });
  });

  it('should get reviews for board', () => {
    const stubBoardReviews = [{ id: 1, title: 'title', content: 'content' }, { id: 1, title: 'title', content: 'content' }];
    const newState = reducer(undefined, {
      type: actionTypes.GET_BOARD_REVIEWS,
      boardReviews: stubBoardReviews,
    });
    expect(newState).toEqual({
      reviews: [],
      selectedReview: null,
      boardReviews: stubBoardReviews,
    });
  });
});
