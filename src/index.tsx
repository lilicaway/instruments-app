import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AnyAction, Store } from 'redux';
import App from './App';
import './index.css';
import configureStore from './redux/configureStore';
import { AppState } from './redux/reducers';
import registerServiceWorker from './registerServiceWorker';

const store: Store<AppState, AnyAction> = configureStore();

ReactDOM.render(<App store={store} />, document.getElementById(
  'root'
) as HTMLElement);
registerServiceWorker();
