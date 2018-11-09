import { MarketDataJson, TimeSeriesDataJson } from '../../types/MarketDataJson';
import { ActionType, AppAction } from '../actions';

export interface MarketData {
  // This means the keys in the object are instrumentIds
  // and the values are an array of TimeSeriesData.
  // Note here that the instrumentId needs to be a string
  // because in javascript the keys of an object are always strings.
  // This is the reason why we store the instrumentId as a string
  // also in InstrumentStatus interface. We want them to be of the
  // same type.
  [instrumentId: string]: TimeSeriesData[];
}

export interface TimeSeriesData {
  dateMillis: number;
  value?: number | undefined;
}

const DEFAULT_STATE: MarketData = {};

export function marketDataReducer(
  state: MarketData = DEFAULT_STATE,
  action: AppAction
): MarketData {
  switch (action.type) {
    case ActionType.DATA_LOADER_COMPLETED:
      return {
        ...state,
        ...convertMarketDataJsonToMarketData(action.payload)
      };
      break;
  }
  return state;
}

function convertMarketDataJsonToMarketData(
  marketDataJson: MarketDataJson
): MarketData {
  const output: MarketData = {};
  for (const instrumentDataJson of marketDataJson.mktData) {
    // Here, even though instrumentId is a number, javascript will
    // convert it to a string because we are using it as a key
    // for an object.
    output[
      instrumentDataJson.instrumentId
    ] = instrumentDataJson.timeSeries.entries.map(
      (source: TimeSeriesDataJson): TimeSeriesData => {
        return {
          // Date.parse can parse a string like "2011-10-10".
          // It returns a number that is the timestamp in milliseconds.
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#ECMAScript_5_ISO-8601_format_support
          dateMillis: Date.parse(source.d),
          value: source.v
        };
      }
    );
  }

  return output;
}

// Selectors

export class MarketDataApi {
  constructor(private readonly state: MarketData) {}

  public filterData(
    startDate: Date | undefined,
    endDate: Date | undefined,
    selectedInstruments: string[],
    minValue: number | '',
    maxValue: number | ''
  ): MarketData {
    const startDateMillis = startDate ? startDate.getTime() : undefined;
    const endDateMillis = endDate ? endDate.getTime() : undefined;

    const retValue: MarketData = {};
    for (const instrumentId of selectedInstruments) {
      retValue[instrumentId] = this.state[instrumentId]
        .filter((timeSeries: TimeSeriesData) => {
          return (
            (startDateMillis === undefined ||
              startDateMillis <= timeSeries.dateMillis) &&
            (endDateMillis === undefined ||
              timeSeries.dateMillis <= endDateMillis)
          );
        })
        .map((timeSeriesData: TimeSeriesData) => {
          let filteredValue = timeSeriesData.value;
          if (filteredValue !== undefined) {
            if (minValue !== '' && filteredValue <= minValue) {
              filteredValue = undefined;
            } else if (maxValue !== '' && filteredValue >= maxValue) {
              filteredValue = undefined;
            }
          }
          return { ...timeSeriesData, value: filteredValue };
        });
    }
    return retValue;
  }
}
