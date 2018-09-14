import React from 'react';
import styled from 'react-emotion';

import Login from './Login';
import SelectFont from './SelectFont';

const Popout = styled('div')`
  position: absolute;
  top: 0;
  width: 500px;
  bottom: 0;
  height: 500px;
  background: #fff;
  z-index: 100000000;
  margin: auto;
  right: 0;
  left: 0;
  box-shadow: 0 0 26px #aaa;
  padding: 10px;
`;

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: true,
      currentStep: 'login',
    };
  }

  render() {
    const {isOpen, currentStep} = this.state;

    if (!isOpen) {
      return null;
    }

    return (
      <Popout>
        <button onClick={() => this.setState({isOpen: false})}>Close</button>
        {currentStep === 'login' && (
          <Login onLogin={() => this.setState({ currentStep: 'selectFont' })} />
        )}
        {currentStep === 'selectFont' && <SelectFont />}
      </Popout>
    );
  }
}
