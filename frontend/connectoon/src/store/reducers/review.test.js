import React from 'react';

import reducer from './review';
import * as actionTypes from '../actions/actionTypes';

const stubReview1 = { id: 1, title: 'test', content: 'test' };
const stubReview2 = { id: 2, title: 'test', content: 'test' };
const stubInitialState = {
  reviews: [stubReview1, stubReview2],
};
const stubReview = {
  id: 1, title: 'test', content: 'test', clickedLike: false,
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
<<<<<<< HEAD
      reviews: stubReviews,
=======
      reviews: [],
      selectedReview: stubSelectedReview,
      boardReviews: [],
    });
  });

  it('should get reviews for board', () => {
    const stubReview2 = { id: 2, title: 'test', content: 'test' };
    const stubBoardReviews = [stubReview, stubReview];
    const newState = reducer(undefined, {
      type: actionTypes.GET_BOARD_REVIEWS,
      boardReviews: stubBoardReviews,
    });
    expect(newState).toEqual({
      reviews: [],
      selectedReview: null,
      boardReviews: stubBoardReviews,
>>>>>>> 056d6a1 (frontend testing for like)
    });
  });

  it('should post like', () => {
    const stubReview2 = {
      id: 2, title: 'test2', content: 'test2', clickedLike: false,
    };
    const stubInitialState = {
      reviews: [stubReview, stubReview2],
      selectedReview: null,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.POST_LIKE,
      likeTargetReview: stubReview2,
    });
    expect(newState.reviews[1].clickedLike).toBe(false);
  });

  it('should post unlike', () => {
    const stubReview2 = {
      id: 2, title: 'test2', content: 'test2', clickedLike: true,
    };
    const stubInitialState = {
      reviews: [stubReview, stubReview2],
      selectedReview: null,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.POST_UNLIKE,
      unlikeTargetReview: stubReview2,
    });
    expect(newState.reviews[1].clickedLike).toBe(true);
  });
});
