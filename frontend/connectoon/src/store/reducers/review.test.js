import React from 'react';

import reducer from './review';
import * as actionTypes from '../actions/actionTypes';

const stubReview1 = { id: 1, title: 'test', content: 'test' };
const stubReview2 = { id: 2, title: 'test', content: 'test' };
const stubInitialState = {
  reviews: [stubReview1, stubReview2],
};

describe('Review Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({
      reviews: [],
    });
  });

  it('should edit review', () => {
    const stubReview1_ = { id: 1, title: 'edited', content: 'edited' };
    const newState = reducer(stubInitialState, {
      type: actionTypes.EDIT_REVIEW,
      targetReview: stubReview1_,
    });
    expect(newState).toEqual({
      reviews: [stubReview1_, stubReview2],
    });
  });

  it('should delete review', () => {
    const newState = reducer(stubInitialState, {
      type: actionTypes.DELETE_REVIEW,
      targetID: stubReview1.id,
    });
    expect(newState).toEqual({
      reviews: [stubReview2],
    });
  });

  it('should get reviews', () => {
    const stubReviews = [stubReview1, stubReview2];
    const newState = reducer(undefined, {
      type: actionTypes.GET_REVIEWS,
      reviews: stubReviews,
    });
    expect(newState).toEqual({
      reviews: stubReviews,
    });
  });
});
