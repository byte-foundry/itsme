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
          <path fill="#fff" d="M8.058 15.803a7.666 7.666 0 1 0 0-15.333 7.666 7.666 0 0 0 0 15.333z"/>
          <path fill="#bdbcbc" d="M9.95 9.171L8.386.318l4.692 1.853 2.429 3.788.247 2.965-.865 2.841-3.11 3.245-2.765.708-2.278-6.506z"/>
          <path fill="none" stroke="#000" strokeWidth=".66720485" d="M8.058 15.803a7.666 7.666 0 1 0 0-15.333 7.666 7.666 0 0 0 0 15.333z"/>
          <path d="M4.844 5.738a.662.662 0 1 0 0-1.324.662.662 0 0 0 0 1.324z"/>
          <path fill="#6e00aa" d="M3.66 10.344a1.505 1.505 0 1 0 0-3.01 1.505 1.505 0 0 0 0 3.01z"/>
          <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".44059916" d="M8.504.543l1.47 8.598H6.951m-1.587 2.365s.832 1.144 2.749 1.144c1.917 0 2.707-1.144 2.707-1.144M10.562 5.496s.208-.7.947-.83c.74-.131 1.158.459 1.158.459"/>
          <path fill="#ff505a" d="M12.587 10.344a1.505 1.505 0 1 0 0-3.01 1.505 1.505 0 0 0 0 3.01z"/>
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
