import * as React from 'react';
import { Label } from 'react-bootstrap';

export interface StateProps {
  min: validatorInput;
  max: validatorInput;
  errorMessage: string;
}

type validatorInput = number | Date | '' | undefined;

/** Returns true if all is ok, or false otherwise. */
function validateOverlap(min: validatorInput, max: validatorInput): boolean {
  if (min === '' || min === undefined || max === '' || max === undefined) {
    return true;
  }
  let minValue: number;
  let maxValue: number;
  if (min instanceof Date) {
    minValue = min.getTime();
  } else {
    minValue = min;
  }
  if (max instanceof Date) {
    maxValue = max.getTime();
  } else {
    maxValue = max;
  }
  return maxValue >= minValue;
}

export class Validator extends React.Component<StateProps> {
  public render() {
    if (validateOverlap(this.props.min, this.props.max)) {
      return <span>{''}</span>;
    } else {
      return (
        <Label id="error" bsStyle="danger">
          {this.props.errorMessage}
        </Label>
      );
    }
  }
}
