import moment from 'moment';
import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import ReactTable, { Column } from 'react-table';
import 'react-table/react-table.css';
import { AppState, marketDataApi, searchStateApi } from '../redux/reducers';
import { MarketData } from '../redux/reducers/marketDataReducer';
import { InstrumentStatus } from '../types/Instrument';

export interface StateProps {
  instrumentIds: string[]; // These are the columnIds as well
  data: TableDataFormat[];
}

export interface TableDataFormat {
  [columnId: string]: number | string | undefined;
}

export type Props = StateProps;

export class Table extends React.Component<StateProps> {
  constructor(props: StateProps) {
    super(props);
  }

  public getColumns(): Column[] {
    const cols: Column[] = [];
    cols.push({
      Header: 'Date',
      accessor: 'date',
      className: 'centered'
    });
    this.props.instrumentIds.forEach(id => {
      cols.push({
        Header: id,
        accessor: id,
        className: 'right'
      });
    });
    return cols;
  }

  public render() {
    return (
      <div>
        <ReactTable
          data={this.props.data}
          columns={this.getColumns()}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, {}, AppState> = (
  state,
  ownProps
): StateProps => {
  const searchState = searchStateApi(state);
  const marketData = marketDataApi(state);
  const selectedInstrumentIds = searchState
    .getInstruments()
    .filter((instrumentStatus: InstrumentStatus) => instrumentStatus.selected)
    .map((instrumentStatus: InstrumentStatus) => instrumentStatus.instrumentId);

  const filteredMarketData: MarketData = marketData.filterData(
    searchState.getStartDate(),
    searchState.getEndDate(),
    selectedInstrumentIds,
    searchState.getMinValue(),
    searchState.getMaxValue()
  );
  return {
    instrumentIds: selectedInstrumentIds,
    data: convertToTableDataFormat(filteredMarketData)
  };
};

function convertToTableDataFormat(marketData: MarketData): TableDataFormat[] {
  interface InstValue {
    instId: string;
    value?: number | undefined;
  }
  const byDate = new Map<number /*dateInMillis*/, InstValue[]>();
  for (const instrumentId of Object.keys(marketData)) {
    for (const timeSeriesData of marketData[instrumentId]) {
      let instValueArray = byDate.get(timeSeriesData.dateMillis);
      if (!instValueArray) {
        instValueArray = [];
        byDate.set(timeSeriesData.dateMillis, instValueArray);
      }
      instValueArray.push({
        instId: instrumentId,
        value: timeSeriesData.value
      });
    }
  }
  const result: TableDataFormat[] = [];
  byDate.forEach((instValueArray: InstValue[], dateInMillis: number) => {
    const row: TableDataFormat = {
      date: moment(dateInMillis).format('DD.MM.YYYY')
    };
    for (const instValue of instValueArray) {
      if (instValue.value) {
        row[instValue.instId] = instValue.value.toFixed(2);
      } else {
        row[instValue.instId] = instValue.value;
      }
    }
    result.push(row);
  });
  return result;
}

const ConnectedTable = connect(
  mapStateToProps,
  null
)(Table);

export default ConnectedTable;
