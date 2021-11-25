import axios from 'axios';

import * as actionCreators from './user';
import store from '../store';

const stubUser = {
  id: 0,
  email: 'test@snu.ac.kr',
  username: 'test',
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

  it('\'token\' should get token correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url, rv) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 204,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.token()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
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

    store.dispatch(actionCreators.logIn({ email: 'test@snu.ac.kr', password: 'qwe123' })).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'logOut\' should log out user correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url, rv) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.logOut()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'register\' should fetch user correctly', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, rv) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 201,
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

  it('\'dupCheckEmail\' should check duplication email correctly', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, rv) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.dupCheckEmail()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'dupCheckUsername\' should check duplication username correctly', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, rv) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.dupCheckUsername()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
