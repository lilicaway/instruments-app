import axios from 'axios';
import { Dispatch } from 'redux';
import { InstrumentStatus } from '../types/Instrument';
import { MarketDataJson } from '../types/MarketDataJson';
import {
  ActionType,
  AppAction,
  DataLoaderCompleted,
  DataLoaderError,
  DataLoaderLoading,
  SearchOptionsUpdated
} from './actions';

export const setDataAsLoading = (): DataLoaderLoading => {
  return { type: ActionType.DATA_LOADER_LOADING, payload: undefined };
};

export const setDataAsCompleted = (
  data: MarketDataJson
): DataLoaderCompleted => {
  return { type: ActionType.DATA_LOADER_COMPLETED, payload: data };
};

export const setDataAsError = (error: string): DataLoaderError => {
  return { type: ActionType.DATA_LOADER_ERROR, payload: error };
};

export const setSearchDataChanged = (
  startDate: Date | undefined,
  endDate: Date | undefined,
  instruments: InstrumentStatus[],
  minValue: number | '',
  maxValue: number | ''
): SearchOptionsUpdated => {
  return {
    type: ActionType.SEARCH_OPTIONS_UPDATED,
    payload: {
      startDate,
      endDate,
      instruments,
      minValue,
      maxValue
    }
  };
};

export const getMarketData = () => {
  return (dispatch: Dispatch<AppAction>) => {
    dispatch(setDataAsLoading());
    axios
      .get<MarketDataJson>('/mktdata.json')
      .then(response => {
        dispatch(setDataAsCompleted(response.data));
      })
      .catch(error => {
        dispatch(setDataAsError(error.toString()));
      });
  };
};
