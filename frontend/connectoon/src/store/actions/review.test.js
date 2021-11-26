import axios from 'axios';

import * as actionCreators from './review';
import store from '../store';

const stubReview = {
  id: 0,
};

const stubBoardReviews = {
  reviews: [stubReview, stubReview],
};

describe('ActionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('\'getReview\' should fetch review correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubReview,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getReview(1)).then(() => {
      const newState = store.getState();
      expect(newState.review.selectedReview).toBe(stubReview);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'editReview\' should edit review correctly', (done) => {
    const spy = jest.spyOn(axios, 'put')
      .mockImplementation((url, rv) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubReview,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.editReview(stubReview)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'deleteReview\' should delete review correctly', (done) => {
    const spy = jest.spyOn(axios, 'delete')
      .mockImplementation((url, rv) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubReview,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.deleteReview(1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'getBoardReviews\' should fetch reviews correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubBoardReviews,
          };
          resolve(result);
        });
      });
    store.dispatch(actionCreators.getBoardReviews()).then(() => {
      const newState = store.getState();
      expect(newState.review.boardReviews).toBe(stubBoardReviews.reviews);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
