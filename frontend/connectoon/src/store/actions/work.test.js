import axios from 'axios';

import * as actionCreators from './work';
import store from '../store';

const stubWork = {
  id: 0,
};
const stubReviews = [
  {
    id: 0,
  },
];

describe('ActionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('\'getWork\' should fetch works correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubWork,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getWork()).then(() => {
      const newState = store.getState();
      expect(newState.work.selectedWork).toBe(stubWork);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'getWorkReviews\' should fetch works correctly', (done) => {
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
      expect(newState.work.selectedReviews).toBe(stubReviews);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'getMainWorks\' should fetch works correctly', (done) => {
    const stubWorks = [stubWork];
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubWorks,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getMainWorks()).then(() => {
      const newState = store.getState();
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'getRecWorks\' should fetch works correctly', (done) => {
    const stubWorks = [stubWork];
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubWorks,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getRecWorks()).then(() => {
      const newState = store.getState();
      expect(newState.work.selectedWorks).toBe(stubWorks);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'getSearchWorks\' should fetch works correctly', (done) => {
    const stubWorks = [[stubWork], [stubWork]];
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubWorks,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getSearchWorks()).then(() => {
      const newState = store.getState();
      expect(newState.work.searchedWorks).toBe(stubWorks);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
