import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import auth from '../utils/apiError';
import { apiMiddleware } from 'redux-api-middleware';
import axiosMiddleware from '../utils/axiosError';

export default function configureStore(initialState) {
  
  const finalCreateStore = compose(
    applyMiddleware(thunk, promise, apiMiddleware, auth, axiosMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}