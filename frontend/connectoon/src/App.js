import React from 'react';
import './App.css';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        dummy
      </div>
    </Provider>
  );
}

export default App;
