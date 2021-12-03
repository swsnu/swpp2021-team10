import axios from 'axios';

import * as actionCreators from './review';
import store from '../store';

const stubReview1 = { id: 1 };
const stubReview2 = { id: 2 };
const stubReview = {
  id: 0,
  clickedLike: false,
};

const stubReviews = {
  reviews: [stubReview1, stubReview2],
};

describe('ActionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('\'editReview\' should edit review correctly', (done) => {
    const spy = jest.spyOn(axios, 'put')
      .mockImplementation((url, rv) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubReview1,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.editReview(stubReview1)).then(() => {
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
            data: stubReview1,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.deleteReview(1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'getWorkReviews\' should fetch reviews correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubReviews,
          };
          resolve(result);
        });
      });
    store.dispatch(actionCreators.getWorkReviews()).then(() => {
      const newState = store.getState();
      expect(newState.review.reviews).toEqual(stubReviews.reviews);
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
            data: stubReviews,
          };
          resolve(result);
        });
      });
    store.dispatch(actionCreators.getBoardReviews()).then(() => {
      const newState = store.getState();
      expect(newState.review.reviews).toBe(stubReviews.reviews);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'getMyReviews\' should fetch reviews correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubReviews,
          };
          resolve(result);
        });
      });
    store.dispatch(actionCreators.getMyReviews()).then(() => {
      const newState = store.getState();
      expect(newState.review.reviews).toBe(stubReviews.reviews);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'postLike\' should like correctly', (done) => {
    const stubReview3 = {
      id: 1,
      clickedLike: true,
    };
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, rv) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubReview3,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.postLike(0)).then(() => {
      const newState = store.getState();
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'postUnlike\' should unlike correctly', (done) => {
    const stubReview3 = {
      id: 1,
      clickedLike: false,
    };
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, rv) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubReview3,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.postUnlike(0)).then(() => {
      const newState = store.getState();
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
