import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'react-emotion';

import Modal from './Modal';

const OpenPopoutButton = styled('button')`
  z-index: 1;
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
        <OpenPopoutButton
          className="G-Ni J-J5-Ji"
          onClick={() => this.setState({ isOpen: true })}
        >
          It's me
        </OpenPopoutButton>
        {isOpen &&
          ReactDOM.createPortal(
            <Modal close={() => this.setState({ isOpen: false })} />,
            this.modalRoot
          )}
      </React.Fragment>
    );
  }
}
