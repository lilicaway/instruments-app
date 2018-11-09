import { ActionType } from '../actions';
import reducers from '../reducers';
import { LoadingState } from '../reducers/loadingIndicator';

test('test startDate and endDate changes', () => {
  let state;
  state = reducers(
    {
      search: {
        startDateMillis: 1388534400000,
        endDateMillis: 1446937200000,
        instruments: [
          { instrumentId: '70', selected: true },
          { instrumentId: '71', selected: true },
          { instrumentId: '72', selected: true },
          { instrumentId: '75', selected: true },
          { instrumentId: '78', selected: true },
          { instrumentId: '152', selected: true }
        ],
        minValue: '',
        maxValue: ''
      },
      marketData: {
        '70': [
          { dateMillis: 1262304000000, value: 6545.91 },
          { dateMillis: 1262563200000, value: 6631.44 },
          { dateMillis: 1262649600000, value: 6579.26 },
          { dateMillis: 1262736000000, value: 6559.41 },
          { dateMillis: 1262822400000, value: 6555.36 }
        ],
        '71': [
          { dateMillis: 1262304000000, value: 4398.666408 },
          { dateMillis: 1262563200000, value: 4480.07499 },
          { dateMillis: 1262649600000, value: 4472.902746 },
          { dateMillis: 1262736000000, value: 4455.952113 },
          { dateMillis: 1262822400000, value: 4452.216503000001 }
        ],
        '72': [
          { dateMillis: 1262304000000, value: 1131.325559 },
          { dateMillis: 1262563200000, value: 1148.388498 },
          { dateMillis: 1262649600000, value: 1146.1408665 },
          { dateMillis: 1262736000000, value: 1143.0290165 },
          { dateMillis: 1262822400000, value: 1143.173881 }
        ],
        '75': [
          { dateMillis: 1262304000000, value: 37.5 },
          { dateMillis: 1262563200000, value: 37.81 },
          { dateMillis: 1262649600000, value: 38.32 },
          { dateMillis: 1262736000000, value: 38.31 },
          { dateMillis: 1262822400000, value: 38.09 }
        ],
        '78': [
          { dateMillis: 1262304000000, value: 38.21 },
          { dateMillis: 1262563200000, value: 38.72 },
          { dateMillis: 1262649600000, value: 39.18 },
          { dateMillis: 1262736000000, value: 39.17 },
          { dateMillis: 1262822400000, value: 39 }
        ],
        '152': [
          { dateMillis: 1262304000000, value: 1154.2398 },
          { dateMillis: 1262563200000, value: 1167.3556649999998 },
          { dateMillis: 1262649600000, value: 1174.763755 },
          { dateMillis: 1262736000000, value: 1169.1093649999998 },
          { dateMillis: 1262822400000, value: 1181.6952150000002 },
          { dateMillis: 1262908800000, value: 1172.9103749999997 }
        ]
      },
      loadingIndicator: {
        loadingState: LoadingState.COMPLETED,
        errorMessage: ''
      }
    },
    {
      type: ActionType.SEARCH_OPTIONS_UPDATED,
      payload: {
        startDate: new Date('2014-01-01T00:00:00.000Z'),
        endDate: new Date('2015-11-07T23:00:00.000Z'),
        instruments: [
          { instrumentId: '70', selected: true },
          { instrumentId: '71', selected: true },
          { instrumentId: '72', selected: true },
          { instrumentId: '75', selected: true },
          { instrumentId: '78', selected: true },
          { instrumentId: '152', selected: true }
        ],
        minValue: 5,
        maxValue: ''
      }
    }
  );
  expect(state).toEqual({
    search: {
      startDateMillis: 1388534400000,
      endDateMillis: 1446937200000,
      instruments: [
        { instrumentId: '70', selected: true },
        { instrumentId: '71', selected: true },
        { instrumentId: '72', selected: true },
        { instrumentId: '75', selected: true },
        { instrumentId: '78', selected: true },
        { instrumentId: '152', selected: true }
      ],
      minValue: 5,
      maxValue: ''
    },
    marketData: {
      '70': [
        { dateMillis: 1262304000000, value: 6545.91 },
        { dateMillis: 1262563200000, value: 6631.44 },
        { dateMillis: 1262649600000, value: 6579.26 },
        { dateMillis: 1262736000000, value: 6559.41 },
        { dateMillis: 1262822400000, value: 6555.36 }
      ],
      '71': [
        { dateMillis: 1262304000000, value: 4398.666408 },
        { dateMillis: 1262563200000, value: 4480.07499 },
        { dateMillis: 1262649600000, value: 4472.902746 },
        { dateMillis: 1262736000000, value: 4455.952113 },
        { dateMillis: 1262822400000, value: 4452.216503000001 }
      ],
      '72': [
        { dateMillis: 1262304000000, value: 1131.325559 },
        { dateMillis: 1262563200000, value: 1148.388498 },
        { dateMillis: 1262649600000, value: 1146.1408665 },
        { dateMillis: 1262736000000, value: 1143.0290165 },
        { dateMillis: 1262822400000, value: 1143.173881 }
      ],
      '75': [
        { dateMillis: 1262304000000, value: 37.5 },
        { dateMillis: 1262563200000, value: 37.81 },
        { dateMillis: 1262649600000, value: 38.32 },
        { dateMillis: 1262736000000, value: 38.31 },
        { dateMillis: 1262822400000, value: 38.09 }
      ],
      '78': [
        { dateMillis: 1262304000000, value: 38.21 },
        { dateMillis: 1262563200000, value: 38.72 },
        { dateMillis: 1262649600000, value: 39.18 },
        { dateMillis: 1262736000000, value: 39.17 },
        { dateMillis: 1262822400000, value: 39 }
      ],
      '152': [
        { dateMillis: 1262304000000, value: 1154.2398 },
        { dateMillis: 1262563200000, value: 1167.3556649999998 },
        { dateMillis: 1262649600000, value: 1174.763755 },
        { dateMillis: 1262736000000, value: 1169.1093649999998 },
        { dateMillis: 1262822400000, value: 1181.6952150000002 },
        { dateMillis: 1262908800000, value: 1172.9103749999997 }
      ]
    },
    loadingIndicator: { loadingState: LoadingState.COMPLETED, errorMessage: '' }
  });
});

test('test unselecting instruments array changes', () => {
  let state;
  state = reducers(
    {
      search: {
        startDateMillis: 1388534400000,
        endDateMillis: 1446937200000,
        instruments: [
          { instrumentId: '70', selected: true },
          { instrumentId: '71', selected: true },
          { instrumentId: '72', selected: true },
          { instrumentId: '75', selected: true },
          { instrumentId: '78', selected: true },
          { instrumentId: '152', selected: true }
        ],
        minValue: '',
        maxValue: ''
      },
      marketData: {
        '70': [
          { dateMillis: 1262304000000, value: 6545.91 },
          { dateMillis: 1262563200000, value: 6631.44 },
          { dateMillis: 1262649600000, value: 6579.26 },
          { dateMillis: 1262736000000, value: 6559.41 },
          { dateMillis: 1262822400000, value: 6555.36 }
        ],
        '71': [
          { dateMillis: 1262304000000, value: 4398.666408 },
          { dateMillis: 1262563200000, value: 4480.07499 },
          { dateMillis: 1262649600000, value: 4472.902746 },
          { dateMillis: 1262736000000, value: 4455.952113 },
          { dateMillis: 1262822400000, value: 4452.216503000001 }
        ],
        '72': [
          { dateMillis: 1262304000000, value: 1131.325559 },
          { dateMillis: 1262563200000, value: 1148.388498 },
          { dateMillis: 1262649600000, value: 1146.1408665 },
          { dateMillis: 1262736000000, value: 1143.0290165 },
          { dateMillis: 1262822400000, value: 1143.173881 }
        ],
        '75': [
          { dateMillis: 1262304000000, value: 37.5 },
          { dateMillis: 1262563200000, value: 37.81 },
          { dateMillis: 1262649600000, value: 38.32 },
          { dateMillis: 1262736000000, value: 38.31 },
          { dateMillis: 1262822400000, value: 38.09 }
        ],
        '78': [
          { dateMillis: 1262304000000, value: 38.21 },
          { dateMillis: 1262563200000, value: 38.72 },
          { dateMillis: 1262649600000, value: 39.18 },
          { dateMillis: 1262736000000, value: 39.17 },
          { dateMillis: 1262822400000, value: 39 }
        ],
        '152': [
          { dateMillis: 1262304000000, value: 1154.2398 },
          { dateMillis: 1262563200000, value: 1167.3556649999998 },
          { dateMillis: 1262649600000, value: 1174.763755 },
          { dateMillis: 1262736000000, value: 1169.1093649999998 },
          { dateMillis: 1262822400000, value: 1181.6952150000002 },
          { dateMillis: 1262908800000, value: 1172.9103749999997 }
        ]
      },
      loadingIndicator: {
        loadingState: LoadingState.COMPLETED,
        errorMessage: ''
      }
    },
    {
      type: ActionType.SEARCH_OPTIONS_UPDATED,
      payload: {
        startDate: new Date(1388534400000),
        endDate: new Date(1388534400000),
        instruments: [
          { instrumentId: '70', selected: true },
          { instrumentId: '71', selected: true },
          { instrumentId: '72', selected: true },
          { instrumentId: '75', selected: true },
          { instrumentId: '78', selected: true },
          { instrumentId: '152', selected: false }
        ],
        minValue: 5,
        maxValue: ''
      }
    }
  );
  expect(state).toEqual({
    search: {
      startDateMillis: 1388534400000,
      endDateMillis: 1388534400000,
      instruments: [
        { instrumentId: '70', selected: true },
        { instrumentId: '71', selected: true },
        { instrumentId: '72', selected: true },
        { instrumentId: '75', selected: true },
        { instrumentId: '78', selected: true },
        { instrumentId: '152', selected: false }
      ],
      minValue: 5,
      maxValue: ''
    },
    marketData: {
      '70': [
        { dateMillis: 1262304000000, value: 6545.91 },
        { dateMillis: 1262563200000, value: 6631.44 },
        { dateMillis: 1262649600000, value: 6579.26 },
        { dateMillis: 1262736000000, value: 6559.41 },
        { dateMillis: 1262822400000, value: 6555.36 }
      ],
      '71': [
        { dateMillis: 1262304000000, value: 4398.666408 },
        { dateMillis: 1262563200000, value: 4480.07499 },
        { dateMillis: 1262649600000, value: 4472.902746 },
        { dateMillis: 1262736000000, value: 4455.952113 },
        { dateMillis: 1262822400000, value: 4452.216503000001 }
      ],
      '72': [
        { dateMillis: 1262304000000, value: 1131.325559 },
        { dateMillis: 1262563200000, value: 1148.388498 },
        { dateMillis: 1262649600000, value: 1146.1408665 },
        { dateMillis: 1262736000000, value: 1143.0290165 },
        { dateMillis: 1262822400000, value: 1143.173881 }
      ],
      '75': [
        { dateMillis: 1262304000000, value: 37.5 },
        { dateMillis: 1262563200000, value: 37.81 },
        { dateMillis: 1262649600000, value: 38.32 },
        { dateMillis: 1262736000000, value: 38.31 },
        { dateMillis: 1262822400000, value: 38.09 }
      ],
      '78': [
        { dateMillis: 1262304000000, value: 38.21 },
        { dateMillis: 1262563200000, value: 38.72 },
        { dateMillis: 1262649600000, value: 39.18 },
        { dateMillis: 1262736000000, value: 39.17 },
        { dateMillis: 1262822400000, value: 39 }
      ],
      '152': [
        { dateMillis: 1262304000000, value: 1154.2398 },
        { dateMillis: 1262563200000, value: 1167.3556649999998 },
        { dateMillis: 1262649600000, value: 1174.763755 },
        { dateMillis: 1262736000000, value: 1169.1093649999998 },
        { dateMillis: 1262822400000, value: 1181.6952150000002 },
        { dateMillis: 1262908800000, value: 1172.9103749999997 }
      ]
    },
    loadingIndicator: { loadingState: LoadingState.COMPLETED, errorMessage: '' }
  });
});
