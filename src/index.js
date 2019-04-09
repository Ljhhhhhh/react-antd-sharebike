import React from 'react';
import ReactDOM from 'react-dom';
import './style/common.less';
import Router from './router'
import {Provider} from 'react-redux'
import Store from './redux/store'
const store = Store()

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>
  , document.getElementById('root')
  );
