import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'react-emotion';

import Modal from './Modal';

import {buttonDefault} from '../defaultStyles';

const Button = styled('button')`
  ${buttonDefault};
`;

export default class App extends React.Component {
  constructor() {
    super();

    this.modalRoot = document.createElement('div');

    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    document.body.appendChild(this.modalRoot);
  }

  componentWillUnmount() {
    document.body.removeChild(this.modalRoot);
  }

  render() {
    const { isOpen } = this.state;

    return (
      <React.Fragment>
        <Button
          className="G-Ni J-J5-Ji"
          onClick={() => this.setState({ isOpen: true })}
        >
        <svg width="16" height="16" style={{opacity: 1}}>
          <g fill="none" stroke="#6558f5">
            <path strokeWidth=".8836" d="M1.186 11.645L12.207.625l3.168 3.168-11.02 11.02-3.816.648z"/>
            <path strokeWidth=".7364" d="M1.097 11.557l3.257 3.257m9.137-12.37L2.693 13.243m-2.077.948l1.207 1.165"/>
          </g>
        </svg>
        </Button>
        {isOpen &&
          ReactDOM.createPortal(
            <Modal close={() => this.setState({ isOpen: false })} />,
            this.modalRoot
          )}
      </React.Fragment>
    );
  }
}
