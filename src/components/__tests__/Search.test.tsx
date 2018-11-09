import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
import * as React from 'react';
import { Props, Search } from '../Search';
import { Validator } from '../Validator';

Enzyme.configure({ adapter: new Adapter() });

let component: Enzyme.ShallowWrapper<Props, Readonly<{}>, Search>;
let onSearchChangeFunctionMock: jest.Mock<{}>;

test('Search startDate > endDate shows error message', () => {
  component = Enzyme.shallow<Search, Props>(
    <Search
      startDate={moment('2018-01-01 00:00:00').toDate()}
      endDate={moment('2014-01-01 00:00:00').toDate()}
      instruments={[]}
      minValue={0}
      maxValue={9000}
      onSearchChange={onSearchChangeFunctionMock}
    />
  );
  expect(component).toMatchSnapshot();
  expect(component.find('#errorMessage')).toBeDefined;
  expect(component.find('errorMessage')).toBeDefined;
  const elem = component
    .find(Validator)
    .first()
    .getElement();
  expect(elem.props.errorMessage).toEqual(
    'Start Date should be before or equal to End Date. Please check'
  );
});

test('Search when minValue > maxValue shows error message', () => {
  component = Enzyme.shallow<Search, Props>(
    <Search
      startDate={moment('2014-01-01 00:00:00').toDate()}
      endDate={moment('2014-01-01 00:00:00').toDate()}
      instruments={[]}
      minValue={10}
      maxValue={3}
      onSearchChange={onSearchChangeFunctionMock}
    />
  );
  expect(component).toMatchSnapshot();
  expect(component.find('errorMessage')).toBeDefined;
  const elem = component
    .find(Validator)
    .at(1)
    .getElement();
  expect(elem.props.errorMessage).toEqual(
    'Minimum value should be less than or equals to Maximum value. Please check'
  );
});
