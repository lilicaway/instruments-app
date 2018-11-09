import * as React from 'react';
import { Checkbox, Col, ControlLabel, Row } from 'react-bootstrap';
import { InstrumentStatus } from '../types/Instrument';

interface Props {
  instruments: InstrumentStatus[];
  onChange: (instruments: InstrumentStatus[]) => void;
}

class InstrumentSelection extends React.Component<Props> {
  public onCheckboxChange = (event: React.FormEvent<Checkbox>) => {
    const updatedInstruments: InstrumentStatus[] = this.props.instruments.map(
      (instrument: InstrumentStatus): InstrumentStatus => {
        const target = event.nativeEvent.target as HTMLInputElement;
        if (target.dataset.instrumentid !== String(instrument.instrumentId)) {
          return instrument;
        }
        return { ...instrument, selected: !instrument.selected };
      }
    );
    this.props.onChange(updatedInstruments);
  };

  public render() {
    const boxList = this.props.instruments.map(
      (instrumentStatus: InstrumentStatus): JSX.Element => {
        return (
          <Col key={instrumentStatus.instrumentId} xs={2} md={2}>
            <Checkbox
              value={instrumentStatus.instrumentId}
              data-instrumentid={instrumentStatus.instrumentId}
              checked={instrumentStatus.selected}
              onChange={this.onCheckboxChange}
            >
              {instrumentStatus.instrumentId}
            </Checkbox>
          </Col>
        );
      }
    );
    return (
      <React.Fragment>
        <Row>
          <Col>
            <ControlLabel>Instruments</ControlLabel>
          </Col>
        </Row>
        <Row>{boxList}</Row>
      </React.Fragment>
    );
  }
}

export default InstrumentSelection;
