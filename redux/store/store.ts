import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import appReducer from '../reducer/reducer';

const logger = createLogger({
  collapsed: true
})

export default function configureStore() {
  return createStore(appReducer, applyMiddleware(thunk, logger));
}