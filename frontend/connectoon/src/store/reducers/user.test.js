import React from 'react';

import reducer from './user';
import * as actionTypes from '../actions/actionTypes';

const stubUser = { id: 1 };

describe('User Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({ users: [], selectedUser: null, myreviews: [] });
  });

  it('should login', () => {
    const stubInitialState = {
      users: [stubUser],
      selectedUser: null,
      myreviews: [],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.LOG_IN,
      selectedUser: stubUser,
    });
    expect(newState).toEqual({
      users: [stubUser],
      selectedUser: stubUser,
      myreviews: [],
    });
  });

  it('should register', () => {
    const stubInitialState = {
      users: [stubUser],
      selectedUser: null,
      myreviews: [],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.REGISTER,
      selectedUser: stubUser,
    });
    expect(newState).toEqual({
      users: [stubUser],
      selectedUser: stubUser,
      myreviews: [],
    });
  });

  it('should get user', () => {
    const stubInitialState = {
      users: [stubUser],
      selectedUser: null,
      myreviews: [],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_USER,
      selectedUser: stubUser,
    });
    expect(newState).toEqual({
      users: [stubUser],
      selectedUser: stubUser,
      myreviews: [],
    });
  });

  it('should get my user', () => {
    const stubInitialState = {
      users: [stubUser],
      selectedUser: null,
      myreviews: [],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_MYUSER,
      selectedUser: stubUser,
    });
    expect(newState).toEqual({
      users: [stubUser],
      selectedUser: stubUser,
      myreviews: [],
    });
  });

  it('should edit my user', () => {
    const stubInitialState = {
      users: [stubUser],
      selectedUser: null,
      myreviews: [],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.EDIT_MYUSER,
      selectedUser: stubUser,
    });
    expect(newState).toEqual({
      users: [stubUser],
      selectedUser: stubUser,
      myreviews: [],
    });
  });

  it('should get my reviews', () => {
    const stubInitialState = {
      users: [stubUser],
      selectedUser: null,
      myreviews: [],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_MYREVIEWS,
      myreviews: [],
    });
    expect(newState).toEqual({
      users: [stubUser],
      selectedUser: null,
      myreviews: [],
    });
  });
});
