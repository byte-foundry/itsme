import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'react-emotion';

import createComposerObserver from '../observers/composer';
import Modal from './Modal';

import { buttonDefault } from '../defaultStyles';

const Button = styled('button')`
  ${buttonDefault};
  transform: scale(1.7) translateX(-5px);
  position: relative;
`;

const InfoIcon = styled('div')`
  position: absolute;
  top: -6px;
  left: -5px;
  width: 8px;
  height: 8px;
  svg {
    opacity: 1;
  }
`;

export default class App extends React.Component {
  constructor() {
    super();

    this.modalRoot = document.createElement('div');

    this.composerObserver = createComposerObserver('customFont');

    this.state = {
      isOpen: false,
      selectedFamily: null,
    };
  }

  componentDidMount() {
    this.composerObserver.observe();

    document.body.appendChild(this.modalRoot);
  }

  componentWillUnmount() {
    this.composerObserver.disconnect();

    document.body.removeChild(this.modalRoot);
  }

  storeFamily = family => {
    this.setState({ selectedFamily: family });
  };

  render() {
    const { isOpen, selectedFamily } = this.state;

    return (
      <React.Fragment>
        <Button
          className="G-Ni J-J5-Ji"
          onClick={() => this.setState({ isOpen: true })}
        >
          <svg width="16" height="16" style={{ opacity: 1 }}>
            <path
              fill="#fff"
              d="M8.058 15.803a7.666 7.666 0 1 0 0-15.333 7.666 7.666 0 0 0 0 15.333z"
            />
            <path
              fill="#bdbcbc"
              d="M9.95 9.171L8.386.318l4.692 1.853 2.429 3.788.247 2.965-.865 2.841-3.11 3.245-2.765.708-2.278-6.506z"
            />
            <path
              fill="none"
              stroke="#000"
              strokeWidth=".66720485"
              d="M8.058 15.803a7.666 7.666 0 1 0 0-15.333 7.666 7.666 0 0 0 0 15.333z"
            />
            <path d="M4.844 5.738a.662.662 0 1 0 0-1.324.662.662 0 0 0 0 1.324z" />
            <path
              fill="#6e00aa"
              d="M3.66 10.344a1.505 1.505 0 1 0 0-3.01 1.505 1.505 0 0 0 0 3.01z"
            />
            <path
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth=".44059916"
              d="M8.504.543l1.47 8.598H6.951m-1.587 2.365s.832 1.144 2.749 1.144c1.917 0 2.707-1.144 2.707-1.144M10.562 5.496s.208-.7.947-.83c.74-.131 1.158.459 1.158.459"
            />
            <path
              fill="#ff505a"
              d="M12.587 10.344a1.505 1.505 0 1 0 0-3.01 1.505 1.505 0 0 0 0 3.01z"
            />
          </svg>
          <InfoIcon>
            {selectedFamily ? (
              <svg viewBox="0 0 496.158 496.158">
                <path
                  fill="#32bea6"
                  d="M496.158 248.085C496.158 111.064 385.088.003 248.082.003 111.07.003 0 111.063 0 248.085c0 137.002 111.07 248.07 248.082 248.07 137.006 0 248.076-111.068 248.076-248.07z"
                />
                <path
                  fill="#fff"
                  d="M384.673 164.968c-5.84-15.059-17.74-12.682-30.635-10.127-7.701 1.605-41.953 11.631-96.148 68.777-22.49 23.717-37.326 42.625-47.094 57.045-5.967-7.326-12.803-15.164-19.982-22.346-22.078-22.072-46.699-37.23-47.734-37.867-10.332-6.316-23.82-3.066-30.154 7.258-6.326 10.324-3.086 23.834 7.23 30.174.211.133 21.354 13.205 39.619 31.475 18.627 18.629 35.504 43.822 35.67 44.066a21.943 21.943 0 0 0 22.022 9.461 21.951 21.951 0 0 0 17.545-16.332c.053-.203 8.756-24.256 54.73-72.727 37.029-39.053 61.723-51.465 70.279-54.908.082-.014.141-.02.252-.043-.041.01.277-.137.793-.369 1.469-.551 2.256-.762 2.301-.773-.422.105-.641.131-.641.131l-.014-.076a2969.508 2969.508 0 0 1 11.533-4.984c11.16-4.585 14.789-16.589 10.428-27.835z"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 496.158 496.158">
                <path
                  fill="#e04f5f"
                  d="M496.158 248.085C496.158 111.064 385.088.003 248.082.003 111.07.003 0 111.063 0 248.085c0 137.002 111.07 248.07 248.082 248.07 137.006 0 248.076-111.068 248.076-248.07z"
                />
                <path
                  fill="#fff"
                  d="M277.042 248.082l72.528-84.196c7.91-9.182 6.876-23.041-2.31-30.951-9.172-7.904-23.032-6.876-30.947 2.306l-68.236 79.212-68.229-79.212c-7.91-9.188-21.771-10.216-30.954-2.306-9.186 7.91-10.214 21.77-2.304 30.951l72.522 84.196-72.522 84.192c-7.91 9.182-6.882 23.041 2.304 30.951a21.864 21.864 0 0 0 14.316 5.318 21.914 21.914 0 0 0 16.638-7.624l68.229-79.212 68.236 79.212c4.338 5.041 10.47 7.624 16.637 7.624a21.863 21.863 0 0 0 14.311-5.318c9.186-7.91 10.22-21.77 2.31-30.951l-72.529-84.192z"
                />
              </svg>
            )}
          </InfoIcon>
        </Button>
        {isOpen &&
          ReactDOM.createPortal(
            <Modal
              storeFamily={this.storeFamily}
              close={() => this.setState({ isOpen: false })}
            />,
            this.modalRoot
          )}
      </React.Fragment>
    );
  }
}
