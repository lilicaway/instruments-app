import { AnyAction, applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers, { AppState } from './reducers';

const configureStore = () => {
  const middlewares = [thunk];
  const store: Store<AppState, AnyAction> = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  return store;
};

export default configureStore;
