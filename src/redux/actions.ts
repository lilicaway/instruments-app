import { Action } from 'redux';
import { InstrumentStatus } from '../types/Instrument';
import { MarketDataJson } from '../types/MarketDataJson';

export enum ActionType {
  // Loading Indicator
  DATA_LOADER_LOADING = 'DATA_LOADER_LOADING',
  DATA_LOADER_COMPLETED = 'DATA_LOADER_COMPLETED',
  DATA_LOADER_ERROR = 'DATA_LOADER_ERROR',

  // Search component
  SEARCH_OPTIONS_UPDATED = 'SEARCH_OPTIONS_UPDATED'
}

export interface DataLoaderLoading
  extends Action<ActionType.DATA_LOADER_LOADING> {
  payload: undefined;
}

export interface DataLoaderCompleted
  extends Action<ActionType.DATA_LOADER_COMPLETED> {
  payload: MarketDataJson;
}

export interface DataLoaderError extends Action<ActionType.DATA_LOADER_ERROR> {
  payload: string;
}

export interface SearchOptionsUpdated
  extends Action<ActionType.SEARCH_OPTIONS_UPDATED> {
  payload: {
    startDate?: Date;
    endDate?: Date;
    instruments: InstrumentStatus[];
    minValue: number | '';
    maxValue: number | '';
  };
}

export type AppAction =
  | DataLoaderLoading
  | DataLoaderCompleted
  | DataLoaderError
  | SearchOptionsUpdated;
