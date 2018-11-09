import { combineReducers, Reducer } from 'redux';
import { AppAction } from '../actions';
import loadingIndicatorReducer, {
  LoadingIndicatorApi,
  LoadingIndicatorState
} from './loadingIndicator';
import {
  MarketData,
  MarketDataApi,
  marketDataReducer
} from './marketDataReducer';
import { searchReducer, SearchState, SearchStateApi } from './searchReducer';

export interface AppState {
  search: SearchState;
  marketData: MarketData;
  loadingIndicator: LoadingIndicatorState;
}

const reducers: Reducer<AppState, AppAction> = combineReducers({
  search: searchReducer,
  marketData: marketDataReducer,
  loadingIndicator: loadingIndicatorReducer
});

export default reducers;

// Selectors

export const searchStateApi = (state: AppState) => {
  return new SearchStateApi(state.search);
};
export const marketDataApi = (state: AppState) => {
  return new MarketDataApi(state.marketData);
};
export const loadingIndicatorApi = (state: AppState) => {
  return new LoadingIndicatorApi(state.loadingIndicator);
};
