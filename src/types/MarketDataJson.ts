// The interfaces in this file represent the data that comes
// in the mktdata.json.

export interface MarketDataJson {
  mktData: InstrumentDataJson[];
}

export interface InstrumentDataJson {
  instrumentId: number;
  timeSeries: {
    entries: TimeSeriesDataJson[];
  };
}

export interface TimeSeriesDataJson {
  d: string;
  v: number;
}
