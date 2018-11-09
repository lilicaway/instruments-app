import { ActionType } from '../actions';
import loadingIndicatorReducer, {
  LoadingIndicatorState,
  LoadingState
} from '../reducers/loadingIndicator';

test('reduceFromInitialToLoading', () => {
  const state = loadingIndicatorReducer(
    { loadingState: LoadingState.INITIAL, errorMessage: '' },
    {
      type: ActionType.DATA_LOADER_LOADING,
      payload: undefined
    }
  );
  const expectedState: LoadingIndicatorState = {
    loadingState: LoadingState.LOADING,
    errorMessage: ''
  };
  expect(state).toEqual(expectedState);
});

test('reduceFromLoadingToCompleted', () => {
  const state = loadingIndicatorReducer(
    { loadingState: LoadingState.LOADING, errorMessage: '' },
    {
      type: ActionType.DATA_LOADER_COMPLETED,
      payload: {
        mktData: [
          {
            instrumentId: 70,
            timeSeries: {
              entries: [
                {
                  d: '2010-01-01',
                  v: 6545.91
                },
                {
                  d: '2010-01-04',
                  v: 6631.44
                }
              ]
            }
          }
        ]
      }
    }
  );
  const expectedState: LoadingIndicatorState = {
    loadingState: LoadingState.COMPLETED,
    errorMessage: ''
  };
  expect(state).toEqual(expectedState);
});

test('reduceFromLoadingToError', () => {
  const state = loadingIndicatorReducer(
    { loadingState: LoadingState.LOADING, errorMessage: '' },
    {
      type: ActionType.DATA_LOADER_ERROR,
      payload: 'Some error'
    }
  );
  const expectedState: LoadingIndicatorState = {
    loadingState: LoadingState.ERROR,
    errorMessage: 'Some error'
  };
  expect(state).toEqual(expectedState);
});
