import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
import * as React from 'react';
import { StateProps, Validator } from '../Validator';

Enzyme.configure({ adapter: new Adapter() });

let component: Enzyme.ShallowWrapper<StateProps, Readonly<{}>, Validator>;
let onSearchChangeFunctionMock: jest.Mock<{}>;

test('Validator for min > max as dates shows error message', () => {
  component = Enzyme.shallow<Validator, StateProps>(
    <Validator
      min={moment('2018-01-01').toDate()}
      max={moment('2014-01-01').toDate()}
      errorMessage="The validator failed with dates"
    />
  );
  expect(component).toMatchSnapshot();
  const elem = component.prop('children');
  expect(elem).toEqual('The validator failed with dates');
});

test('Valdator for min > max as numbers shows error message', () => {
  component = Enzyme.shallow<Validator, StateProps>(
    <Validator
      min={10}
      max={5}
      errorMessage="The validator failed with numbers"
    />
  );
  expect(component).toMatchSnapshot();
  const elem = component.prop('children');
  expect(elem).toEqual('The validator failed with numbers');
});
