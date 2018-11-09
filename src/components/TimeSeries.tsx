import * as chartjs from 'chart.js';
import * as React from 'react';
import { ChartData, Scatter } from 'react-chartjs-2';
import { connect, MapStateToProps } from 'react-redux';
import { AppState, marketDataApi, searchStateApi } from '../redux/reducers';
import { MarketData } from '../redux/reducers/marketDataReducer';
import { InstrumentStatus } from '../types/Instrument';

interface StateProps {
  instruments: InstrumentStatus[];
  data: MarketData;
}

export type Props = StateProps;

class TimeSeries extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  public selectColor(colorNum: number, colors: number) {
    if (colors < 1) {
      colors = 1;
    } // defaults to one color - avoid divide by zero
    return 'hsl(' + ((colorNum * (360 / colors)) % 360) + ',90%,40%)';
  }

  public getDataForInstrumentId(id: string): chartjs.ChartPoint[] {
    const dataValues: chartjs.ChartPoint[] = [];

    this.props.data[id].forEach(element => {
      dataValues.push({
        x: element.dateMillis,
        y: element.value
      });
    });

    return dataValues;
  }

  public buildDataSets(): chartjs.ChartDataSets[] {
    const dataSet: chartjs.ChartDataSets[] = [];

    this.props.instruments.forEach((instrument, index) => {
      const colorForLine = this.selectColor(
        Number(index),
        this.props.instruments.length
      );

      if (instrument.selected) {
        dataSet.push({
          label: 'Instrument ' + instrument.instrumentId,
          fill: false,
          lineTension: 0.1,
          backgroundColor: colorForLine,
          borderColor: colorForLine,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: colorForLine,
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: colorForLine,
          pointHoverBorderColor: `rgba(220,220,220,1)`,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 3,
          showLine: true,
          data: this.getDataForInstrumentId(instrument.instrumentId)
        });
      }
    });

    return dataSet;
  }

  public render() {
    const options = {
      legend: {
        onClick: (e: Event) => e.preventDefault()
      },
      scales: {
        xAxes: [
          {
            type: 'time'
          }
        ]
      }
    };

    const data: ChartData<chartjs.ChartData> = {
      datasets: this.buildDataSets()
    };
    return (
      <React.Fragment>
        <Scatter data={data} options={options} />
      </React.Fragment>
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
    instruments: searchState.getInstruments(),
    data: getNormalizedDataForChart(selectedInstrumentIds, filteredMarketData)
  };
};

function getNormalizedDataForChart(
  selectedInstrumentIds: string[],
  data: MarketData
): MarketData {
  if (selectedInstrumentIds.length === 1) {
    return data;
  } else {
    const retValue: MarketData = {};
    for (const instrumentId of selectedInstrumentIds) {
      retValue[instrumentId] = [];
      let denominator: number | undefined;
      for (const series of data[instrumentId]) {
        if (denominator === undefined) {
          denominator = series.value;
        }
        let newValue: number | undefined;
        if (denominator !== undefined) {
          newValue =
            series.value === undefined ? undefined : series.value / denominator;
        }
        retValue[instrumentId].push(
          Object.assign({}, series, { value: newValue })
        );
      }
    }
    return retValue;
  }
}

export default connect(
  mapStateToProps,
  null
)(TimeSeries);
