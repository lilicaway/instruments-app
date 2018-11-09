import * as React from 'react';
import { Col, ControlLabel, Row } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import {
  connect,
  MapDispatchToPropsParam,
  MapStateToPropsParam
} from 'react-redux';
import { Dispatch } from 'redux';
import { setSearchDataChanged } from '../redux/actionCreators';
import { AppAction } from '../redux/actions';
import { AppState, searchStateApi } from '../redux/reducers';
import { InstrumentStatus } from '../types/Instrument';
import { FormControlWithDelay } from './FormControlWithDelay';
import InstrumentSelection from './InstrumentSelection';
import LoadingIndicator from './LoadingIndicator';
import { Validator } from './Validator';

interface StateProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  instruments: InstrumentStatus[];
  minValue: number | '';
  maxValue: number | '';
}

interface DispatchProps {
  onSearchChange: (
    startDate: Date | undefined,
    endDate: Date | undefined,
    instruments: InstrumentStatus[],
    minValue: number | '',
    maxValue: number | ''
  ) => void;
}

export type Props = StateProps & DispatchProps;

export class Search extends React.Component<Props> {
  public onStartDateChange = (startDate: Date | Date[]) => {
    if (startDate instanceof Date) {
      this.props.onSearchChange(
        startDate,
        this.props.endDate,
        this.props.instruments,
        this.props.minValue,
        this.props.maxValue
      );
    }
  };
  public onEndDateChange = (endDate: Date | Date[]) => {
    if (endDate instanceof Date) {
      this.props.onSearchChange(
        this.props.startDate,
        endDate,
        this.props.instruments,
        this.props.minValue,
        this.props.maxValue
      );
    }
  };
  public onInstrumentChange = (instruments: InstrumentStatus[]) => {
    this.props.onSearchChange(
      this.props.startDate,
      this.props.endDate,
      instruments,
      this.props.minValue,
      this.props.maxValue
    );
  };
  public onMinValueChange = (min: number | '') => {
    this.props.onSearchChange(
      this.props.startDate,
      this.props.endDate,
      this.props.instruments,
      min,
      this.props.maxValue
    );
  };
  public onMaxValueChange = (max: number | '') => {
    this.props.onSearchChange(
      this.props.startDate,
      this.props.endDate,
      this.props.instruments,
      this.props.minValue,
      max
    );
  };
  public render() {
    return (
      <React.Fragment>
        <Row>
          <LoadingIndicator />
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Row>
              <Col xs={12} md={3}>
                <ControlLabel>Start Date</ControlLabel>
              </Col>
              <Col xs={12} md={9}>
                <DatePicker
                  onChange={this.onStartDateChange}
                  value={this.props.startDate}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={6}>
            <Row>
              <Col xs={12} md={3}>
                <ControlLabel>End Date</ControlLabel>
              </Col>
              <Col xs={12} md={9}>
                <DatePicker
                  onChange={this.onEndDateChange}
                  value={this.props.endDate}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <Validator
              min={this.props.startDate}
              max={this.props.endDate}
              errorMessage={
                'Start Date should be before or equal to End Date. Please check'
              }
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Row>
              <Col xs={12} md={3}>
                <ControlLabel>Set Minimun</ControlLabel>
              </Col>
              <Col xs={12} md={9}>
                <FormControlWithDelay
                  value={this.props.minValue}
                  placeholder="Enter min"
                  onChange={this.onMinValueChange}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={6}>
            <Row>
              <Col xs={12} md={3}>
                <ControlLabel>Set Maximun</ControlLabel>
              </Col>
              <Col xs={12} md={9}>
                <FormControlWithDelay
                  value={this.props.maxValue}
                  placeholder="Enter max"
                  onChange={this.onMaxValueChange}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={12}>
            <Validator
              min={this.props.minValue}
              max={this.props.maxValue}
              errorMessage={
                'Minimum value should be less than or equals to Maximum value. Please check'
              }
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <InstrumentSelection
              onChange={this.onInstrumentChange}
              instruments={this.props.instruments}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps: MapStateToPropsParam<StateProps, {}, AppState> = (
  state: AppState
): StateProps => {
  const searchState = searchStateApi(state);
  return {
    startDate: searchState.getStartDate(),
    endDate: searchState.getEndDate(),
    instruments: searchState.getInstruments(),
    minValue: searchState.getMinValue(),
    maxValue: searchState.getMaxValue()
  };
};

const mapDispatchToProps: MapDispatchToPropsParam<DispatchProps, {}> = (
  dispatch: Dispatch<AppAction>,
  ownProps: {}
): DispatchProps => {
  return {
    onSearchChange: (
      startDate: Date | undefined,
      endDate: Date | undefined,
      instruments: InstrumentStatus[],
      minValue: number | '',
      maxValue: number | ''
    ) => {
      dispatch(
        setSearchDataChanged(
          startDate,
          endDate,
          instruments,
          minValue,
          maxValue
        )
      );
    }
  };
};

const ConnectedSearch = connect<StateProps, DispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(Search);
export default ConnectedSearch;
