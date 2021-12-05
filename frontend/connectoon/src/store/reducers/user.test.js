import React from 'react';

import reducer from './user';
import * as actionTypes from '../actions/actionTypes';

const stubUser = {
  id: 1,
  email: 'test@snu.ac.kr',
  username: 'test',
};

describe('User Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({
      users: [], selectedUser: null, loggedInUser: null,
    });
  });

  it('should get token', () => {
    const stubInitialState = {
      users: [stubUser],
      selectedUser: null,
      loggedInUser: null,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.TOKEN,
    });
    expect(newState).toEqual({
      users: [stubUser],
      selectedUser: null,
      loggedInUser: null,
    });
  });

  it('should login', () => {
    const stubInitialState = {
      users: [stubUser],
      selectedUser: null,
      loggedInUser: null,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.LOG_IN,
      loggedInUser: stubUser,
    });
    expect(newState).toEqual({
      users: [stubUser],
      selectedUser: null,
      loggedInUser: stubUser,
    });
  });

  it('should logout', () => {
    const stubInitialState = {
      users: [stubUser],
      selectedUser: null,
      loggedInUser: stubUser,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.LOG_OUT,
    });
    expect(newState).toEqual({
      users: [stubUser],
      selectedUser: null,
      loggedInUser: null,
    });
  });

  it('should register', () => {
    const stubInitialState = {
      users: [stubUser],
      selectedUser: null,
      loggedInUser: null,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.REGISTER,
      selectedUser: stubUser,
    });
    expect(newState).toEqual({
      users: [stubUser],
      selectedUser: stubUser,
      loggedInUser: null,
    });
  });

  it('should get user', () => {
    const stubInitialState = {
      users: [stubUser],
      selectedUser: null,
      loggedInUser: null,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_USER,
      selectedUser: stubUser,
    });
    expect(newState).toEqual({
      users: [stubUser],
      selectedUser: stubUser,
      loggedInUser: null,
    });
  });

  it('should get my user', () => {
    const stubInitialState = {
      users: [stubUser],
      selectedUser: null,
      loggedInUser: null,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_MYUSER,
      loggedInUser: stubUser,
    });
    expect(newState).toEqual({
      users: [stubUser],
      selectedUser: null,
      loggedInUser: stubUser,
    });
  });

  it('should edit my user', () => {
    const stubInitialState = {
      users: [stubUser],
      selectedUser: null,
      loggedInUser: stubUser,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.EDIT_MYUSER,
    });
    expect(newState).toEqual({
      users: [stubUser],
      selectedUser: null,
      loggedInUser: null,
    });
  });

  it('should get my reviews', () => {
    const stubInitialState = {
      users: [stubUser],
      selectedUser: null,
      loggedInUser: null,
      myreviews: [],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_MYREVIEWS,
      myreviews: [],
    });
    expect(newState).toEqual({
      users: [stubUser],
      selectedUser: null,
      loggedInUser: null,
      myreviews: [],
    });
  });
});
