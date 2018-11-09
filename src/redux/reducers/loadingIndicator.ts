import { ActionType, AppAction } from '../actions';

export enum LoadingState {
  INITIAL = 'INITIAL',
  LOADING = 'LOADING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface LoadingIndicatorState {
  loadingState: LoadingState;
  errorMessage: string;
}

const DEFAULT_STATE: LoadingIndicatorState = {
  loadingState: LoadingState.INITIAL,
  errorMessage: ''
};

const loadingIndicatorReducer = (
  state: LoadingIndicatorState = DEFAULT_STATE,
  action: AppAction
) => {
  switch (action.type) {
    case ActionType.DATA_LOADER_LOADING:
      return {
        ...state,
        loadingState: LoadingState.LOADING,
        errorMessage: ''
      };

      break;
    case ActionType.DATA_LOADER_COMPLETED:
      return {
        ...state,
        loadingState: LoadingState.COMPLETED,
        errorMessage: ''
      };

      break;
    case ActionType.DATA_LOADER_ERROR:
      return {
        ...state,
        loadingState: LoadingState.ERROR,
        errorMessage: action.payload
      };

      break;
  }
  return state;
};

export default loadingIndicatorReducer;

// Selectors

export class LoadingIndicatorApi {
  constructor(private readonly state: LoadingIndicatorState) {}

  public getLoadingState(): LoadingState {
    return this.state.loadingState;
  }

  public getLoadingDataErrorMessage(): string {
    return this.state.errorMessage;
  }
}
