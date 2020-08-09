import React, { Component } from 'react';
import { createStore,applyMiddleware } from 'redux'
import {Provider} from "react-redux"
import ReactLayoutDemo from './demo/index.jsx';
import thunk from 'redux-thunk';
import module from './reducers.js';
import {combineReducers} from 'redux-immutable';
import { createLogger } from 'redux-logger';
const middleware = [thunk];

const middlewareAction = () => ({ getState }) => (next) => (action) => 
  next(typeof action==='string' ? {type:action}: action)

// 三方日志中间件
// middleware.push(createLogger());
// 自定义redux中间件
middleware.push(middlewareAction());

const store = createStore(combineReducers({module:module}),applyMiddleware(...middleware));

class MainPage extends Component{
  render(){
    return (<Provider store={store}>
              <ReactLayoutDemo />
            </Provider>
            )
  }
}
export default MainPage;

