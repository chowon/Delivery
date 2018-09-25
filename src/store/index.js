import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

const config = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['pin', 'restaurants', 'category', 'cart', 'loggedIn']
};

const asyncDispatchMiddleware = store => next => action => {
  let syncActivityFinished = false;
  let actionQueue = [];

  function flushQueue() {
    actionQueue.forEach(a => store.dispatch(a)); // flush queue
    actionQueue = [];
  }

  function asyncDispatch(asyncAction) {
    actionQueue = actionQueue.concat([asyncAction]);

    if (syncActivityFinished) {
      flushQueue();
    }
  }

  const actionWithAsyncDispatch =
      Object.assign({}, action, { asyncDispatch });

  next(actionWithAsyncDispatch);
  syncActivityFinished = true;
  flushQueue();
};

const reducer = persistCombineReducers(config, reducers);
export default function configurationStore(initialState = {}) {
  const store = createStore(
    reducer,
    {},
    applyMiddleware(thunk, asyncDispatchMiddleware),
  );
  const persistor = persistStore(store);
  return { persistor, store };
}
