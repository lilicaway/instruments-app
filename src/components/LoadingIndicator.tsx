import * as React from 'react';
import { Alert } from 'react-bootstrap';
import { connect, MapStateToPropsParam } from 'react-redux';
import { AppState, loadingIndicatorApi } from '../redux/reducers';
import { LoadingState } from '../redux/reducers/loadingIndicator';

interface Props {
  loadingState: LoadingState;
  errorMessage: string;
}

const LoadingIndicator: React.SFC<Props> = props => {
  const { loadingState, errorMessage } = props;
  switch (loadingState) {
    case LoadingState.LOADING:
      return (
        <div>
          <i
            className="fa fa-spinner fa-spin"
            style={{ fontSize: 24 + 'px' }}
          />
          Loading data...
        </div>
      );
    case LoadingState.ERROR:
      return (
        <Alert bsStyle="danger">
          <strong>Error!</strong> {errorMessage}.
        </Alert>
      );
    default:
      return <div />;
  }
};

const mapStateToProps: MapStateToPropsParam<Props, {}, AppState> = (
  state: AppState
): Props => {
  const loadingIndicator = loadingIndicatorApi(state);

  return {
    loadingState: loadingIndicator.getLoadingState(),
    errorMessage: loadingIndicator.getLoadingDataErrorMessage()
  };
};

const ConnectedLoadingIndicator = connect<Props, {}, {}, AppState>(
  mapStateToProps
)(LoadingIndicator);
export default ConnectedLoadingIndicator;
