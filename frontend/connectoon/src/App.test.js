import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

import * as userActionCreators from './store/actions/user';

test('renders learn react link', () => {
  const spyToken = jest.spyOn(userActionCreators, 'token').mockImplementation(() => { return (dispatch) => {}; });
  render(<App />);
});
