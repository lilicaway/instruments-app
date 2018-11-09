import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { StateProps, Table, TableDataFormat } from '../Table';

Enzyme.configure({ adapter: new Adapter() });

let component: Enzyme.ShallowWrapper<StateProps, Readonly<{}>, Table>;

test('renders correctly', () => {
  const inst: string[] = ['70', '71', '72'];
  const marketData: TableDataFormat[] = [
    { 70: '8202.98', 71: '3816.92', 72: '1245.4', date: '01.01.2014' },
    { 70: '8202.98', 71: '3759.89', 72: '1235.32', date: '02.01.2014' },
    { 70: '8270.46', 71: '3780.78', 72: '1242.60', date: '03.01.2014' },
    { 70: '8272.23', 71: '3781.67', 72: '1241.65', date: '06.01.2014' },
    { 71: '3816.92', 72: '1245.40', date: '01.01.2014' },
    { 71: '3759.89', 72: '1235.32', date: '02.01.2014' },
    { 71: '3780.78', 72: '1242.60', date: '03.01.2014' },
    { 71: '3781.67', 72: '1241.65', date: '06.01.2014' },
    { 72: '1245.40', date: '01.01.2014' },
    { 72: '1235.32', date: '02.01.2014' },
    { 72: '1242.60', date: '03.01.2014' },
    { 72: '1241.65', date: '06.01.2014' }
  ];

  component = Enzyme.shallow<Table, StateProps>(
    <Table data={marketData} instrumentIds={inst} />
  );
  expect(component).toMatchSnapshot();
});
