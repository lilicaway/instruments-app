export interface InstrumentStatus {
  // The instrumentId is a string here on purpose.
  // Take a look at the MarketData interface from marketDataReducer.ts
  // for an explanation.
  instrumentId: string;
  selected: boolean;
}
