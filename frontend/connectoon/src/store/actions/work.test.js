import axios from 'axios';

import * as actionCreators from './work';
import store from '../store';

const stubWork = {
  id: 0,
};

describe('ActionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('`getMainWorks` should fetch works correctly', (done) => {
    const stubMainWorksDict = {
      worklists: [
        { title: 'Test Works', works: JSON.stringify([stubWork]) },
        { title: 'Test Works', works: JSON.stringify([stubWork]) },
      ],
    };
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url, params) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubMainWorksDict,
          };
          resolve(result);
        });
      });
    const stubNewMainWorksDict = [
      { title: 'Test Works', works: [stubWork] },
      { title: 'Test Works', works: [stubWork] },
    ];
    const stubRange = [0, 24];
    store.dispatch(actionCreators.getMainWorks([stubRange, stubRange])).then(() => {
      const newState = store.getState();
      expect(newState.work.mainWorkLists).toEqual(stubNewMainWorksDict);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
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

    store.dispatch(actionCreators.getWork(1)).then(() => {
      const newState = store.getState();
      expect(newState.work.selectedWork).toBe(stubWork);
      expect(newState.work.noSuchSelectedWork).toBeFalsy();
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'getWork\' should notify work not existing correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            response: {
              status: 404,
            },
          };
          reject(result);
        });
      });

    store.dispatch(actionCreators.getWork(1)).then(() => {
      const newState = store.getState();
      expect(newState.work.noSuchSelectedWork).toBeTruthy();
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'getRecWorks\' should fetch works correctly', (done) => {
    const stubWorks = [[stubWork], [stubWork]];
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url, params) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubWorks,
          };
          resolve(result);
        });
      });
    const stubRange = [0, 24];
    store.dispatch(actionCreators.getRecWorks([stubRange, stubRange])).then(() => {
      const newState = store.getState();
      expect(newState.work.recommWorks).toEqual(stubWorks);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'getSearchWorks\' should fetch works correctly', (done) => {
    const stubWorks = [[stubWork], [stubWork]];
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url, params) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubWorks,
          };
          resolve(result);
        });
      });
    const stubRange = [0, 24];
    store.dispatch(actionCreators.getSearchWorks('', '', [stubRange, stubRange])).then(() => {
      const newState = store.getState();
      expect(newState.work.searchedWorks).toEqual(stubWorks);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'postWorkReview\' should post a new review correctly', (done) => {
    const stubReviewData = {
      title: 'test_title', content: 'test_content', score: 4.0,
    };
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, data) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 204,
          };
          resolve(result);
        });
      });
    const stubReviewId = 1;
    store.dispatch(actionCreators.postWorkReview(stubReviewId, stubReviewData)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
