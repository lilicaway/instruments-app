import * as React from 'react';
import { Grid, Row } from 'react-bootstrap';
import { connect, MapDispatchToPropsParam } from 'react-redux';
import { Action } from 'redux';
import { getMarketData } from '../redux/actionCreators';
import { InstrumentStatus } from '../types/Instrument';
import Search from './Search';
import Table from './Table';
import TimeSeries from './TimeSeries';

interface DispatchProps {
  loadMarketData: () => void;
}

const mapDispatchToProps: MapDispatchToPropsParam<DispatchProps, {}> = (
  dispatch,
  ownProps
): DispatchProps => {
  return {
    loadMarketData: () => {
      dispatch((getMarketData() as {}) as Action<any>);
    }
  };
};

export type Props = DispatchProps;

export class Home extends React.Component<Props> {
  public componentDidMount() {
    this.props.loadMarketData();
  }

  public getDataApi = () => {
    this.props.loadMarketData();
  };

  public onSearchChange = (
    startDate: Date,
    endDate: Date,
    instruments: InstrumentStatus[]
  ) => {
    this.setState({ startDate, endDate, instruments });
  };

  public render() {
    return (
      <React.Fragment>
        <Grid>
          <Row>
            <Search />
          </Row>
          <Row>
            <React.Fragment>
              <Row>
                <TimeSeries />
              </Row>
              <Row>Tabular data</Row>
              <Row>
                <Table />
              </Row>
            </React.Fragment>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

const ConnectedHome = connect<{}, DispatchProps, {}>(
  undefined, // mapStateToProps,
  mapDispatchToProps
)(Home);

export default ConnectedHome;
