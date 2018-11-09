import { InstrumentStatus } from '../../types/Instrument';
import { InstrumentDataJson, MarketDataJson } from '../../types/MarketDataJson';
import { ActionType, AppAction } from '../actions';

export interface SearchState {
  startDateMillis: number | undefined;
  endDateMillis: number | undefined;
  instruments: InstrumentStatus[];
  minValue: number | '';
  maxValue: number | '';
}

const DEFAULT_STATE: SearchState = {
  startDateMillis: new Date('2014-01-01').getTime(),
  endDateMillis: new Date().getTime(),
  instruments: [],
  minValue: '',
  maxValue: ''
};

export function searchReducer(
  state: SearchState = DEFAULT_STATE,
  action: AppAction
): SearchState {
  switch (action.type) {
    case ActionType.DATA_LOADER_COMPLETED:
      return {
        ...state,
        instruments: createInstrumentStatuses(action.payload)
      };
    case ActionType.SEARCH_OPTIONS_UPDATED:
      return {
        ...state,
        startDateMillis: action.payload.startDate
          ? action.payload.startDate.getTime()
          : undefined,
        endDateMillis: action.payload.endDate
          ? action.payload.endDate.getTime()
          : undefined,
        instruments: action.payload.instruments,
        minValue: action.payload.minValue,
        maxValue: action.payload.maxValue
      };
  }
  return state;
}

function createInstrumentStatuses(
  marketData: MarketDataJson
): InstrumentStatus[] {
  return marketData.mktData.map(
    (instrumentDataJson: InstrumentDataJson): InstrumentStatus => {
      return {
        instrumentId: String(instrumentDataJson.instrumentId),
        selected: true
      };
    }
  );
}

export class SearchStateApi {
  constructor(private readonly state: SearchState) {}

  public getInstruments(): InstrumentStatus[] {
    return this.state.instruments;
  }

  public getStartDate(): Date | undefined {
    return this.state.startDateMillis
      ? new Date(this.state.startDateMillis)
      : undefined;
  }

  public getEndDate(): Date | undefined {
    return this.state.endDateMillis
      ? new Date(this.state.endDateMillis)
      : undefined;
  }

  public getMaxValue(): number | '' {
    return this.state.maxValue;
  }

  public getMinValue(): number | '' {
    return this.state.minValue;
  }
}
