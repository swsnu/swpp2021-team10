import axios from 'axios';

import * as actionCreators from './user';
import store from '../store';

const stubUser = {
  id: 0,
};

const stubReviews = [
  {
    id: 1,
  },
];

describe('ActionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('\'logIn\' should fetch user correctly', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, rv) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubUser,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.logIn(stubUser)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'register\' should fetch user correctly', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, rv) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubUser,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.register(stubUser)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'getUser\' should fetch user correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubUser,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getUser(0)).then(() => {
      const newState = store.getState();
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'getMyUser\' should fetch user correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubUser,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getMyUser()).then(() => {
      const newState = store.getState();
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'editMyUser\' should edit review correctly', (done) => {
    const spy = jest.spyOn(axios, 'put')
      .mockImplementation((url, rv) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubUser,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.editMyUser(stubUser)).then(() => {
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
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
