import * as React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { AnyAction, Store } from 'redux';
import Home from './components/Home';
import { AppState } from './redux/reducers';

interface Props {
  store: Store<AppState, AnyAction>;
}

const App: React.SFC<Props> = ({ store }) => (
  <Provider store={store}>
    <div className="App">
      <Navbar inverse={true} staticTop={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <p>Instruments graph</p>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1}>Home</NavItem>
        </Nav>
      </Navbar>

      <Home />
    </div>
  </Provider>
);

export default App;
