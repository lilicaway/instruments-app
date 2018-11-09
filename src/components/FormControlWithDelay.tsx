import * as React from 'react';
import { FormControl } from 'react-bootstrap';

interface Props {
  value: number | '';
  placeholder?: string;
  onChange?: (value: number | '') => void;
}

interface State {
  value: number | '';
}

const DELAY_MS = 1000;

/**
 * This is just a wrapper of react-bootstrap's FormControl that only calls
 * the onChange prop after some time passed since the last key was pressed.
 * This allows for a faster response time since the application doesn't need
 * to run all the redux reducers on each key press.
 */
export class FormControlWithDelay extends React.Component<Props, State> {
  private timer: number = 0;
  constructor(props: Props) {
    super(props);
    this.state = { value: this.props.value };
  }

  public onChange = (event: React.FormEvent<FormControl>) => {
    window.clearTimeout(this.timer);
    const target = event.nativeEvent.target as HTMLInputElement;
    let updatedValue: number | '' = '';
    if (target.value !== '') {
      updatedValue = Number(target.value);
      if (isNaN(updatedValue) || !isFinite(updatedValue)) {
        updatedValue = this.state.value;
      }
    }
    this.setState({ value: updatedValue });
    this.timer = window.setTimeout(this.reportChanges, DELAY_MS);
  };

  public render() {
    return (
      <React.Fragment>
        <FormControl
          {...this.props}
          type="text"
          value={this.state.value}
          onChange={this.onChange}
        />
      </React.Fragment>
    );
  }

  private reportChanges = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  };
}
